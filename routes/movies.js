const express = require('express');
const passport = require('passport');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES, SIXTY_MINUTES } = require('../utils/time');

// Estrategia de JWT
require('../utils/auth/strategies/jwt')

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  // GET

  router.get('/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:movies']),
  async function(req, res, next) {
    cacheResponse(res, FIVE_MINUTES);

    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (err) {
      next(err);
    }
  });

  // GET/ID

  router.get('/:movieId',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:movies']),
  validationHandler({ movieId: movieIdSchema }, 'params'),
  async function(req, res, next) {
    cacheResponse(res, SIXTY_MINUTES);

    const { movieId } = req.params;

    try {
      const movies = await moviesService.getMovie({ movieId });

      res.status(200).json({
        data: movies,
        message: 'movie retrieved'
      });
    } catch (err) {
      next(err);
    }
  });

  // POST

  router.post('/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:movies']),
  validationHandler(createMovieSchema),
  async function(req, res, next) {
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesService.createMovie({ movie });

      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      });
    } catch (err) {
      next(err);
    }
  });

  // PUT

  router.put('/:movieId',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:movies']),
  validationHandler({ movieId: movieIdSchema }, 'params'),
  validationHandler(updateMovieSchema),
  async function(req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updatedMovieId = await moviesService.updateMovie({
        movieId,
        movie
      });

      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated'
      });
    } catch (err) {
      next(err);
    }
  });

  // DELETE

  router.delete('/:movieId',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['delete:movies']),
  validationHandler({ movieId: movieIdSchema }, 'params'),
  async function(req, res, next) {
    const { movieId } = req.params;

    try {
      const deletedMovieId = await moviesService.deleteMovie({ movieId });

      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApi;