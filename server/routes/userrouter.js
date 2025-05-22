const userController =  require('../controllers/usercontroller.js');
const {Router} = require("express");

const router = new Router();

router.get('/users', userController.getAllUsers);       // GET все пользователи
router.get('/users/:id', userController.getUser);        // GET один пользователь
router.post('/users', userController.addUser);           // POST создать
router.put('/users/:id', userController.updateUser);     // PUT обновить
router.delete('/users/:id', userController.deleteUser); 


module.exports = {router};

