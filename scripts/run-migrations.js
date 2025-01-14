const { pool } = require('../config/database');

async function runMigrations() {
    try {
        // Создаем таблицу комментариев
        await pool.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                post_id INTEGER NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
            CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
            CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
        `);
        
        console.log('Таблица комментариев успешно создана');
    } catch (error) {
        console.error('Ошибка при создании таблицы комментариев:', error);
    }
}

runMigrations().then(() => {
    console.log('Миграции выполнены');
    process.exit(0);
}).catch(err => {
    console.error('Ошибка при выполнении миграций:', err);
    process.exit(1);
}); 