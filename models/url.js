const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },

        redirectURL: {
            type: String,
            required: true,
        },

        visitHistory: [     //it is an array of objects 
            {
                timestamp: {
                    type: Number
                }
            }
        ],

        createdBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users',
        },
    },

    { timestamps: true }    //tells thr entry time
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL;