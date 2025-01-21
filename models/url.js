const mongoose = require('mongoose');

const urlSchema = mongoose.schema(
    {
      shortId : {
        type : String,
        required : true,
        unique : true,
      },

      redirectUrl : {
        type : String,
        required : true,
      },

      visitHistory : [{timestamp :{ type : Number}}]
    },

    {timestamp : true}
);

const URL = mongoose.schema('url', urlSchema);

module.exports = URL;