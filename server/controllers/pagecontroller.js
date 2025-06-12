const pool = require("../db");

// Добавление новой статьи
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

// Получение статьи по ID
exports.getArticle = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID должен быть числом' });
    }

    const query = 'SELECT title, content_html FROM articles WHERE id = $1';

    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error('Ошибка при выполнении запроса', err);
            return res.status(500).send('Внутренняя ошибка сервера');
        }

        if (result.rows.length === 0) {
            return res.status(404).send('Статья не найдена');
        }

        console.log('Статья найдена:', result.rows[0]);
        res.json(result.rows[0]);
    });
};

// Получение случайной статьи
exports.getRandomArticle = (req, res) => {
    const query = `SELECT * FROM articles ORDER BY RANDOM() LIMIT 1`;

    pool.query(query, (err, result) => {
        if (err) {
            console.error('Ошибка при выполнении запроса', err);
            return res.status(500).send('Внутренняя ошибка сервера');
        }

        if (result.rows.length === 0) {
            return res.status(404).send('Статья не найдена');
        }

        console.log('Случайная статья:', result.rows[0]);
        res.json(result.rows[0]);
    });
};