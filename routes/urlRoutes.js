const express = require('express');
const { shortenUrl, redirectUrl, getStats } = require('../controllers/urlController');
const rateLimiter = require('../middlewares/rateLimiter');
const router = express.Router();


router.post('/shorten', rateLimiter, shortenUrl);
router.get('/:shortId', redirectUrl);
router.get('/stats/:shortId', getStats);

module.exports = router;
