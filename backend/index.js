const express = require('express')
const app = express()
const mongoose = require('mongoose')
const friendRoute = require ('./route/friendRoute')
const cors = require('cors')
// app.use(cors())
app.use(express.json())
require('dotenv').config()
const DB_PATH = process.env.DB_URL
const PORT = process.env.PORT || 3003

const cors = require("cors");
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.get("/",(req,res)=>{
    res.send("Home Page")
})
mongoose.connect(DB_PATH )
app.use("/friends", friendRoute)
app.listen(PORT,()=>{
    console.log("Make n test APIs calls")
})
