const { Router } = require('express');
const router = Router();
const articles = require('../controller/articlesControl');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/read/:id', articles.getArticles)

router.get('/id/:id', articles.getSpecificArticle)

router.get('/new', requireAuth, articles.getNewArticle)

router.post('/new', requireAuth, articles.postNewArticle)

router.delete('/delete/:id', requireAuth, articles.rmArticle)

router.put('/edit/:id', requireAuth, articles.editArticle)

router.get('/edit/:id', requireAuth, articles.getEditArticle)

module.exports = router;

