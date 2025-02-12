const express = require('express');
const path = require('path');

//Connection
const connectMongoDB = require('./connection');

//URL model
const URL = require('./models/url');

const cookieParser = require('cookie-parser');

//Middleware
const { checkForAuthentication, restrictTo } = require('./middleware/auth');

//Routes
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8000;


connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>   //here then is a listener. If mongodb get connected then print MongoDb connected
    console.log("MongoDb connected")
);


app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));    //this is for form data
app.use(cookieParser());
app.use(checkForAuthentication);


app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {               //this home is our ejs file
        urls: allUrls,
    })
});


app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use('/', staticRoute);                 // static router = frontend pages
app.use('/user', userRoute);


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