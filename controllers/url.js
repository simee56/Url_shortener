const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: 'URL is not found!' })
    };

    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    });

    return res.json({ id: shortId });
}


async function handleGetAnalytics(req, res) {         //tells the number of clicks and visits
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })

}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
};