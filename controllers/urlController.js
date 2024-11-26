const shortid = require('shortid');
const { createUrl, findUrlByShortId, incrementClick, getUrlStats } = require('../models/urlModel');

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'Original URL is required.' });

  try {
    const shortId = shortid.generate();
    await createUrl(originalUrl, shortId);
    res.status(201).json({ shortUrl: `${req.get('host')}/${shortId}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to shorten URL.' });
  }
};

exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  try {
    const urlData = await findUrlByShortId(shortId);
    if (!urlData) return res.status(404).json({ error: 'URL not found.' });

    await incrementClick(shortId);
    res.redirect(urlData.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Failed to redirect URL.' });
  }
};

exports.getStats = async (req, res) => {
  const { shortId } = req.params;
  try {
    const stats = await getUrlStats(shortId);
    if (!stats) return res.status(404).json({ error: 'Stats not found.' });

    res.json({
      originalUrl: stats.originalUrl,
      shortId: stats.shortId,
      clicks: stats.clicks,
      lastAccessed: stats.lastAccessed,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats.' });
  }
};
