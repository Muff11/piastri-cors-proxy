
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Proxy any request to /api/* to the actual OpenF1 API
app.get('/api/*', async (req, res) => {
  const openf1Url = 'https://api.openf1.org' + req.originalUrl.replace('/api', '');
  try {
    const response = await fetch(openf1Url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error proxying request to:', openf1Url, err);
    res.status(500).json({ error: 'Failed to fetch from OpenF1' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
