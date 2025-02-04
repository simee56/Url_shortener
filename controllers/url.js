const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required!' })
    };

    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    });

    return res.render("home",{
        id:shortId
    });
}


async function handleGetAnalytics(req, res) {         //tells the number of clicks and visits
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndDelete({
        shortId
    },
        {
            $pop: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    )

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
}


module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
};