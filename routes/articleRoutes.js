const { Router } = require('express');
const router = Router();
const articles = require('../controller/articlesControl');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', articles.getArticles)

router.get('/id/:id', articles.getSpecificArticle)

router.get('/new', requireAuth, articles.getNewArticle)

router.post('/new', requireAuth, articles.postNewArticle)

module.exports = router;

