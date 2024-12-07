const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    title : {type : String, required:true},
    writer : {type : String, required:true},
    coverImg : {type : String, required:false},
    content : {type : String, required:false},
}, { timestamps: true });


module.exports = mongoose.model('Post', postSchema);