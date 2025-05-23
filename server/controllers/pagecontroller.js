const pool = require("../db")

exports.addArticle = (req, res) => {
    const post = req.body;

    // Проверка входящих данных
    if (!post.title || !post.content || !post.UserId) {
        return res.status(400).json({ error: 'Не все обязательные поля указаны' });
    }

    const query = `
        INSERT INTO articles(title, content_html, author_id, created_at, updated_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    const values = [post.title, post.content, post.UserId];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Ошибка при выполнении запроса', err);
            return res.status(500).send('Внутренняя ошибка сервера');
        }

        console.log('Статья успешно добавлена');
        res.status(201).send('Статья успешно добавлена');
    });
};

exports.getArticle = (req, res) => {
    const articleId = req.params.id;
    const query = (`SELECT title, content_html FROM articles WHERE id = $1`);

    pool.query(query, [articleId], (err, result) => 
            
            {
            if (err) {
                        console.error('Ошибка при выполнении запроса', err);
                        return res.status(500).send('Внутренняя ошибка сервера');
                    };
                    console.log('пользователь найден ' + result.rows[0]);
                    res.send(result.rows[0]);
            })};


