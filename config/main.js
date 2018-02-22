require('dotenv').config();

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 8080,
    db: {
        driver: process.env.DATABASE_DRIVER,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT || 3306
    },
    vkStrategy: {
        appId: 5353074,
        secretKey: 'flg9IezrLrUX7rWcmm01'
    }
};

module.exports = config;
