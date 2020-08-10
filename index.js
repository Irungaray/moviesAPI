const express = require('express');
const app = express();

const { config } = require('./config/index.js');
const authApi = require('./routes/auth')
const moviesApi = require('./routes/movies.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const helmet = require('helmet');

app.use(express.json());

// Rutas
authApi(app);
moviesApi(app);
app.use(notFoundHandler);

// Catch 404
app.use(notFoundHandler);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// Helmet
app.use(helmet());

app.listen(config.port, function() {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
})