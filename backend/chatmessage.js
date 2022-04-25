const mongoose = require('mongoose');

const chatmessage = mongoose.Schema({
    Room:{
        type:String,
        require:true
    },
    user:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:false
    },
    image:{
        type:String,
        require:false,
    },
    createtime:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model('chat',chatmessage);