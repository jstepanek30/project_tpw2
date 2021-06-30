const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const { stripHtml } = require('string-strip-html');

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
    snippet:{
        type: String,

    },
    content:{
        type:String,
        required: true,
    }

}, { timestamps: { createdAt: 'createdAt', currentTime: () => new Date() } })

articleSchema.pre('validate',function(next){
    if(this.content){
        this.content = htmlPurify.sanitize(this.content)
        this.snippet = stripHtml(this.content.substring(0,200)).result + '...'
    }
    next();
})

module.exports = mongoose.model('Article', articleSchema);