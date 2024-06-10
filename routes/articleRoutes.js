const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/articles', articleController.createArticle);
router.get('/articles', articleController.getArticles);
router.get('/articles/search', articleController.searchArticles);
router.get('/articles/date', articleController.getArticlesByDate);
router.get('/articles/:slug', articleController.getArticleBySlug);
router.put('/articles/:slug', articleController.updateArticle);
router.delete('/articles/:slug', articleController.deleteArticle);

module.exports = router;
