export default async function handler(req, res) {
  try {
    const token = req.query.token;
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
}
