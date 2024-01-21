const express = require('express');
const route=express.Router();
const {Taxs}=require("../models")

route.get("/",async(req,res)=>{
    const result=await Taxs.findAll({order:['Rate']});
    res.json(result);
})
route.post("/add",async(req,res)=>{
    console.log(req.body);
    const result=await Taxs.create({Rate:req.body.rate});
    if(result)
    res.json({msg:"Tax Rate Is Added"});
    else
    res.json({err:"Tax Rate Is not Added!"});

})

module.exports = route;
