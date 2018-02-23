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
    },
    FacebookStrategy: {
        appId: 2051422921809105,
        secretKey: 'ad9a1245d4513f701d5d62638ad21964'
    },
    TwitterStrategy: {
        consumerKey: 'yu46h6rip4JGFcoa1q2vNzRJe',
        consumerSecret: 'YhNmDtve6XnCN0XE8mk5vW0eEmDwwZI4vb8v10uO7H5E8FftNa'
    },
};

module.exports = config;
