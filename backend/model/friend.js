const mongoose = require('mongoose')
const mySchema = new mongoose.Schema({
    name : { type : String, unique : true}
})
const Abc = mongoose.model('friend' , mySchema)
module.exports = Abc