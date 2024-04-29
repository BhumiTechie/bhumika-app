const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/SocialMeedia');

const UserSchema = new mongoose.Schema({
    username:String,
    password: String,
    email:String,
    photo:String
})

UserSchema.plugin(plm);

module.exports = mongoose.model('user', UserSchema);