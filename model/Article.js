const mongoose = require('mongoose');

articleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    description:{
        type: String,
        required: true,
        minlength: 5,
        required: true
    },
    content:{
        type:String,
        required: true,
        required: true
    }

})

module.exports = mongoose.model('Article', articleSchema);