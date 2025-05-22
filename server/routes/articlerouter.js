const articleController =  require('../controllers/pagecontroller');
const {Router} = require("express");

const articleRouter = new Router();

articleRouter.post('/articles', articleController.addArticle);  

module.exports = {articleRouter};