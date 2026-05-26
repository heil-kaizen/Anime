export default async function handler(req, res) {
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
}
