const CACHE_DURATION = 60000; // 60 seconds

// Note: In Vercel serverless functions, global variables preserve state across warm boots
// but not across cold boots or different edge nodes. Keep this in mind.
const tokenCache = new Map();

export default async function handler(req, res) {
  try {
    const token = req.query.token;
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
}
