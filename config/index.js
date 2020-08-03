require('dotenv').config()

const config = { // Para testear, quitar .trim()  al final de NODE_ENV
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,

    // CONFIG
    CORS: process.env.CORS,

    // MONGO
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,

    // AUTH
    authJwtSecret: process.env.AUTH_JWT_SECRET,


    // USERS
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,

    // API KEYS
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
};

module.exports = { config }