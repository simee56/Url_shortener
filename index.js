const express = require('express');
const { connectMongoDB } = require('./connection');
const urlRoute = require('./routes/url');

const URL = require('./models/url')

const app = express();
const PORT = 8003;

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("MongoDb connected")
);

app.use(express.json());
app.use('/url', urlRoute);

app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    )

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
    console.log("THE SERVER HAS STARTED AT THE PORT", PORT);
})