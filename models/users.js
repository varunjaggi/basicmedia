const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleID:{
        type: String,
        required: true
    },
    displayName:{
        type: String
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    Age:{
        type: String
    },
    Gender:{
        type: String
    },
    Imagename:{
        type:String

    }
})

module.exports = mongoose.model('User',UserSchema)