const express = require('express');
const cors = require('cors');
const db=require('./models');
const Users=require("./Routes/Users");
const Cakes=require("./Routes/Cakes");
const Taxs=require("./Routes/Taxs");
const app=express();
const portno=8000;
app.use(express.json());
app.use(cors());
app.use("/Users",Users);
app.use("/Cakes",Cakes);
app.use("/Taxs",Taxs);
db.sequelize.sync().then(()=>{
    //app server
    app.listen(portno,()=>{console.log("Server Port => "+portno);})
})