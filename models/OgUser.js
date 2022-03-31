const mongoose = require('mongoose')

const OgUserSchema = new mongoose.Schema({
    ogaddress:{
        type:String,
        required: true,
    },
    ogemail:{
        type:String,
        required: true,
    }
})

const OgUser = mongoose.model("oguser", OgUserSchema);

module.exports = OgUser