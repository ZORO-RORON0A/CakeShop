const express = require('express');
const cors = require('cors');
const db=require('./models');
const { Sequelize } = require('sequelize');
const app=express();
const portno=8000;
app.use(express.json());
app.use(cors());

db.sequelize.sync().then(()=>{
    //app server
    app.listen(portno,()=>{console.log("Server Port => "+portno);})
})