const mongoose = require('mongoose');

articleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Please enter a valid header'],
        required: true,
        minlength: [5, 'Minimum length of name is 5 characters.']
    },
    description:{
        type: String,
        required: true,
        minlength: [5, 'Minimum length of description is 5 characters.']
    },
    content:{
        type:String,
        required: true,
    }

}, { timestamps: { createdAt: 'createdAt', currentTime: () => new Date() } })

module.exports = mongoose.model('Article', articleSchema);