const { Schema, model } = require('mongoose')

const UserSchema = Schema({    
    email: { type: String, required: true, unique: true},
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    roles: [{ type: String }]
})

module.exports = model('User', UserSchema)