const express = require('express');

const path = require('path');

const connectMongoDB = require('./connection');

const urlRoute = require('./routes/url');

const staticRoute = require('./routes/staticRouter');

const URL = require('./models/url');

const app = express();

const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>   //here then is a listener. If mongodb get connected then print MongoDb connected
    console.log("MongoDb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))   //this is for form data

app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {               //this home is our ejs file
        urls: allUrls,
    })
});

app.use('/url', urlRoute);
app.use('/', staticRoute);    // static router = frontend pages

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
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