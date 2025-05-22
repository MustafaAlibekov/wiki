const pool = require("../db")

exports.addUser = (req, res) => {
    const user = req.body;
    pool.query(`INSERT INTO users(login, password_hash, role, created_at) VALUES('${user.login}', '${user.password}', '${user.role}', CURRENT_TIMESTAMP)`, (err, result) => {
        if (err) {
            console.error('Ошибка при выполнении запроса', err);
            return res.status(500).send('Внутренняя ошибка сервера');
        }

        console.log('пользователь создан'); // Здесь будет текущее время из PostgreSQL
        res.send('Пользователь добавлен (пример)');
    });
};


exports.updateUser = (req, res) => {
    const user = req.body;

    const query = `
        UPDATE users
        SET 
            login = $1,
            password_hash = $2,
            role = $3
        WHERE id = $4;
    `;

    const values = [user.login, user.password, user.role, user.id];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Ошибка при выполнении запроса', err);
            return res.status(500).send('Внутренняя ошибка сервера');
        }

        console.log('Пользователь обновлен');
        res.send('Пользователь обновлен');
    });
};

exports.getUser = (req, res) => 
    {
        const userId = req.params.id;
        const query = (`SELECT id, login FROM users WHERE id = $1`);
        
        pool.query(query, [userId], (err, result) => 
            
            {
            if (err) {
                        console.error('Ошибка при выполнении запроса', err);
                        return res.status(500).send('Внутренняя ошибка сервера');
                    };
                    console.log('пользователь найден ' + result.rows[0]);
                    res.send(result.rows[0]);
            }
    )};

exports.getAllUsers = (req, res) => {
    const query = 'SELECT id, login, role, created_at FROM users';

    pool.query(query, (err, result) => {
        if (err) {
            console.error('Ошибка при получении пользователей', err);
            return res.status(500).send('Ошибка сервера');
        }

        res.json(result.rows);
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';

    pool.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Ошибка при удалении пользователя', err);
            return res.status(500).send('Ошибка сервера');
        }

        if (result.rows.length === 0) {
            return res.status(404).send('Пользователь не найден');
        }

        console.log('Пользователь удален:', result.rows[0]);
        res.send('Пользователь удален');
    });
};