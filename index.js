const express = require('express');
const app = express();

const { config } = require('./config/index.js');
const moviesApi = require('./routes/movies.js');

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

// Rutas
moviesApi(app);
app.use(notFoundHandler);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
})