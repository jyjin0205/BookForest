const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    title : {type : String, required:true},
    author : {type : String, required:true},
    ISBN : {type : String, required:true},
    coverImg : {type : String, required:false},
    file : {type : String, required:false},
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema);