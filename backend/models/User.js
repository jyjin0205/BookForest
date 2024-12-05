const mongoose = require('mongoose');
const {Schema, model, Types} = mongoose;


const userSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    hashedPassword: {type: String, required:true},
    hashedLostKey: {type: String},
    nickname: {type: String, required:true},
    email: {type: String,required:true},
    books: [{type: Types.ObjectId}]
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
