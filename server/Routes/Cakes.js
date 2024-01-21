const express = require('express');
const route=express.Router();
const {Cakes}=require("../models")
const {validateToken} = require('../Middleware/Auth');
route.get("/",async(req,res)=>{
    const result=await Cakes.findAll();
    res.json(result);
})
route.post("/add",validateToken,async(req,res)=>{
    const result=await Cakes.create(req.body);
    if(result)
    res.json({msg:"Cake Is Added"});
    else
    res.json({err:"Cake Is not Added!"});

})
route.delete("/delete/:id",validateToken,async(req,res)=>{
    const id=req.params.id;
    const result=await Cakes.destroy({where:{id:id}});
    if(result)
    res.json({msg:"Cake Is deleted"});
    else
    res.json({err:"Cake Is not deleted!"});

})
module.exports = route;
