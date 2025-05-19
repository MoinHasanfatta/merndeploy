const express = require('express')
const router = express.Router()
const Abc = require('../model/friend')
router.use(express.json())


router.get("/",(req,res)=>{ // read
    Abc.find()
        .then(data => res.json(data))
})

router.post("/",(req,res)=>{  // create
    const {name} = req.body
    const newData = new Abc ({name})
    newData.save()
        .then(data => res.json())
        .catch(err => res.send("The error is"+ err.message))
})

router.put("/:id",(req,res)=>{ //update
    const {name} = req.body
    Abc.findByIdAndUpdate(req.params.id ,{name}, {new : true})
    .then(data => res.json(data))
    .catch(err => res.send("the error is : "+ err.message))
})

router.delete("/:id",(req,res)=>{ //delete
    Abc.findByIdAndDelete(req.params.id)
    .then(data => res.send("Delete successfully"))
    .catch(err => res.send("the error "+ err.message))
})

module.exports = router