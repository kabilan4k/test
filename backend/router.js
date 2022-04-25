const express = require('express');
const router = express.Router();
const chatSchema = require('./chatSchema');

router.post('/',async(req,res)=>{
    var data = new InfoRouter({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password,
        
    });
    await data.save();
    if(!data){
        res.json({message:false});
    }else{
        res.json({message:true});
    }
});

router.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

module.exports = router;