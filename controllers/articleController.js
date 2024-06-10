const Article = require('../models/article');

exports.createArticle = async (req, res) => {
    try {
        const { title, description, category, slug } = req.body;
        const newArticle = new Article({ title, description, category, slug });
        const article = await newArticle.save();
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getArticleBySlug = async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findOneAndDelete({ slug: req.params.slug });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json({ message: 'Article deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchArticles = async (req, res) => {
    try {
        const { query } = req.query;
        const articles = await Article.find({ 
            $or: [
                { title: new RegExp(query, 'i') },
                { description: new RegExp(query, 'i') }
            ] 
        });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getArticlesByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const articles = await Article.find({
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
