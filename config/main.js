require('dotenv').config();

// PROJECT CONFIG
const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 8080,
    imagesDestination: './public/images/',
    secret_key: 'secret key',
    db: {
        driver: process.env.DATABASE_DRIVER,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT || 3306
    }
};

module.exports = config;
