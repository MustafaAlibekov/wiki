const express = require('express')
const app = express()
const userrouter = require('./routes/userrouter')
const articleRouter = require('./routes/articlerouter')
const cors = require('cors'); // ✅ Подключаем cors
port = 5000;
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors()); // ✅ Разрешаем все CORS-запросы
app.use('/api', userrouter.router)
app.use('/articleAPI', articleRouter.articleRouter)

app.listen(port)
{
    console.log(`server is working on port ${port}`);
}