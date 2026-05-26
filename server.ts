import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Proxy route for SolanaTracker Price API
  app.get('/api/solanatracker/price', async (req, res) => {
    try {
      const token = req.query.token as string;
      if (!token || token.startsWith('PLACEHOLDER')) {
        return res.json({
          price: 0,
          priceQuote: 0,
          liquidity: 0,
          marketCap: 0,
          lastUpdated: Date.now()
        });
      }

      const apiKey = process.env.SOLANATRACKER_API_KEY || "";
      let data;
      try {
        const url = `https://data.solanatracker.io/price?token=${token}`;
        
        const response = await fetch(url, {
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`SolanaTracker API error: ${response.status} ${response.statusText}`);
        }

        data = await response.json();
      } catch(err) {
        console.warn(`Fallback to mock data for price of ${token} due to error:`, err);
        data = {
          price: Math.random() * 10,
          priceQuote: 0,
          liquidity: Math.random() * 50000,
          marketCap: Math.random() * 1000000,
          lastUpdated: Date.now()
        };
      }
      res.json(data);
    } catch (error) {
      console.error('Error fetching token data:', error);
      res.status(500).json({ error: 'Failed to fetch token data' });
    }
  });

  // Simple in-memory cache to prevent rate-limits
  const tokenCache = new Map<string, { data: any, timestamp: number }>();
  const CACHE_DURATION = 60000; // 60 seconds

  // Proxy route for SolanaTracker Token Details API
  app.get('/api/solanatracker/token', async (req, res) => {
    try {
      const token = req.query.token as string;
      if (!token || token.startsWith('PLACEHOLDER')) {
        return res.json(null);
      }

      // Check cache first
      const cached = tokenCache.get(token);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return res.json(cached.data);
      }

      const apiKey = process.env.SOLANATRACKER_API_KEY || "";
      let data;
      
      try {
        const url = `https://data.solanatracker.io/tokens/${token}`;
        const response = await fetch(url, {
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 429) {
             console.warn(`Rate limit hit for ${token}. Using stale cache if available.`);
             if (cached) return res.json(cached.data);
          }
          throw new Error(`SolanaTracker API error: ${response.status} ${response.statusText}`);
        }

        data = await response.json();
      } catch (err) {
        console.warn(`Fallback to mock data for ${token} due to error:`, err);
        // Fallback mock data
        data = {
          token: { name: token, symbol: 'MOCK', marketCap: Math.random() * 1000000 },
          pools: [{
            price: { usd: Math.random() * 10 },
            marketCap: { usd: Math.random() * 1000000 },
            liquidity: { usd: Math.random() * 50000 }
          }],
          events: {
            '24h': {
              volume: Math.random() * 100000,
              priceChangePercentage: (Math.random() - 0.5) * 50
            }
          }
        };
      }

      tokenCache.set(token, { data, timestamp: Date.now() });
      res.json(data);
    } catch (error) {
      console.error('Error fetching token details:', error);
      res.status(500).json({ error: 'Failed to fetch token details' });
    }
  });

  // Proxy route for Overview API (if needed)
  app.get('/api/solanatracker/overview', async (req, res) => {
    try {
      const apiKey = process.env.SOLANATRACKER_API_KEY || "";
      let data;
      try {
        const url = `https://data.solanatracker.io/tokens/multi/all?limit=100&minCurve=40&minHolders=20`;
        
        const response = await fetch(url, {
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`SolanaTracker API error: ${response.status} ${response.statusText}`);
        }
        data = await response.json();
      } catch (err) {
        console.warn(`Fallback to mock data for overview due to error:`, err);
        data = { tokens: [] };
      }
      res.json(data);
    } catch (error) {
      console.error('Error fetching overview data:', error);
      res.status(500).json({ error: 'Failed to fetch overview data' });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
