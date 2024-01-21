const {Users}=require("../models");
const express = require('express');
const route=express.Router();
const bcrypt = require('bcrypt');
const { json } = require("sequelize");
const {sign} =require("jsonwebtoken");
route.get("/",async(req,res)=>{
    const users=await Users.findAll({attributes:{exclude:["password"]}});
    res.json(users);
})
route.post("/log",async(req,res)=>{
    console.log(req.body);
    const users=await Users.findAll({where:{name:req.body.name}});
    let a=0;
    let i=0;
    for(i=0;i<users.length;i++)
    {
        let match=await bcrypt.compare(req.body.password,users[i].password);
        if(match)
        {
            a=1;
            break;
        }
    }
    if(a===1)
    {

        let user=await Users.findAll({where :{id:users[i].id},attributes:{exclude:["password"]}});
        // const token=
        res.json({msg:"Logged in",user:user});
    }
    else{
        res.json({err:"Invalide Username or Password"});
    }
})

route.post("/add",async(req,res)=>{
    console.log("Adding For Registration");
    const user=req.body;
    const users=await Users.findAll();
    let a=0;
    users.forEach(u => {
        if(u.emailid===user.emailid)
        {
            a=1;
        }
    });
    if(a===0)
    {
        const pwd=await bcrypt.hash(user.password,10);

        await Users.create({name:user.name,password:pwd,emailid:user.emailid});
        res.json({msg:"Registered SuccessFullY!"});
    }
    else{
        res.json({err:"Email Id is Repeated"});
    }
    
    
});
module.exports = route;
