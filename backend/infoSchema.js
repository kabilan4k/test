const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
    
    firstname:{
        type:String,
        required:true,
        trim:true

    },
    lastname:{
        type:String,
        required:false,
        trim:true

    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    createtime:{
        type:Date,
        default:Date.now,
    }

})

module.exports = mongoose.model('Info',infoSchema);