const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    regDate: {type: Date},
   // lastLogin: {type: Date}
})

module.exports = model('User', schema)