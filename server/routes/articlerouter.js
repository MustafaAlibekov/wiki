const articleController =  require('../controllers/pagecontroller');
const {Router} = require("express");

const articleRouter = new Router();

articleRouter.post('/articles', articleController.addArticle);  
articleRouter.get('/articles/:id', articleController.getArticle);  

module.exports = {articleRouter};