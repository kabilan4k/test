const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    Room:{
        type:Number,
        required:true,
        trim:true

    },
    Sender:{
        type:String,
        require:true,
        trimL:true
    },
    Receiver:{
        type:String,
        require:true,
        trimL:true
    },
    createtime:{
        type:Date,
        default:Date.now,
    }

})

module.exports = mongoose.model('chats',chatSchema);