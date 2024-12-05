const mongoose = require('mongoose');
const {Schema, model, Types} = mongoose;

const bookSchema = new mongoose.Schema({
    title: {type:String},
    author: {type: Types.String},
    ISBN: {type: String},
    coverImg: {type: String, required:true},
    file: {type: String,required:true},
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
