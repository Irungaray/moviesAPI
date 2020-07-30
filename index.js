const express = require('express');
const app = express();

const { config } = require('./config/index.js');
const moviesApi = require('./routes/movies.js');

const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers')

app.use(express.json());

moviesApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
})