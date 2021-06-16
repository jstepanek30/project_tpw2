const Article = require('../model/Article')

const postNewArticle = async (req,res) => {
    const { name, description, content } = req.body;
    const article = await Article.create({ name, description, content })
    console.log(article)
    res.status(200)
}
const getNewArticle = (req,res) => {
    res.render('./newArticle.hbs')
}
const getArticles = async (req,res) => {
    const articles = await Article.find({})
    res.render('./articles.hbs', {articles})
}
const getSpecificArticle = async (req,res) => {

    const article = await Article.findById(req.params.id)
    res.render('./articleId', {article : article})
}

module.exports = { getNewArticle, getArticles, postNewArticle, getSpecificArticle };