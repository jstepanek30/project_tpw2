const Article = require('../model/Article')

const errorHandler = (err) => {
    console.log(err)
    let errors = { name:'', description:'', content:'' }

    if(err.code === 11000){
        errors.name = `Article with name ${errors.name} is already exists.`
    }
    if(err.message.includes('Article validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

const postNewArticle = async (req,res) => {
    const { name, description, content } = req.body;
    try {

        const article = new Article({ name, description, content })
        await article.save()
        res.status(200).redirect(`/articles/id/${article.id}`)
    } catch (error) {
        const errors = errorHandler(error)
        console.log(errors)
        res.status(400).render('new', { errors, name, description, content })
    }
}
const getNewArticle = (req,res) => {
    res.render('new');
}
const getArticles = async (req,res) => {
    let id = Number(req.params.id);
    const numberOfArticles = (await Article.find({})).length;
    if(!id) {
        id = 1;
    }
    else if(id<1){ 
        id = 1;
    }
    else if (id>Math.ceil(numberOfArticles/5)){
        id = Math.max(Math.ceil(numberOfArticles/5),1)
    }
    const articles = await Article.find({}).sort({createdAt:'desc'}).limit(5).skip(id*5-5);
    res.render('articles', {articles, id, numberOfArticles});
}
const getSpecificArticle = async (req,res) => {
    try {
        const article = await Article.findById(req.params.id)
        res.status(200).render('article', {article : article})
    } catch (error) {
        error.message = `Error 404 : Article with ID: ${req.params.id} not found`;
        res.status(404).render('error', { error:error })
    }
    
}
const rmArticle = async (req,res) => {
    try {
        await Article.findByIdAndDelete(req.params.id)
        res.redirect('/articles/read/1')
    } catch (error) {
        error.message = `Error 404 : Article with ID: ${req.params.id} not found`;
        res.status(404).render('./error', { error:error })
    }
}
const editArticle = async (req,res) => {
    const { name, description, content } = req.body;
    const article = await Article.findById(req.params.id)
    try {
        article.name = req.body.name;
        article.description = req.body.description;
        article.content = req.body.content;
        await article.save();
        res.render('article', {article : article})  
    } catch (error) {
        const errors = errorHandler(error)
        res.status(400).render(`edit`, { errors, article })
    }
}
const getEditArticle = async (req,res) => {
    try {
        const article = await Article.findById(req.params.id)
        res.render('edit', { article: article })
    } catch (error) {
        error.message = `Error 404 : Article with ID: ${req.params.id} not found`;
        res.status(404).render('./error', { error:error })
    }
}

module.exports = { getNewArticle, getArticles, postNewArticle, getSpecificArticle, rmArticle, editArticle, getEditArticle };