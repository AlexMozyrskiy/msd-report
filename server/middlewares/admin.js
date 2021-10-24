const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token');

module.exports = function (req, res, next) {
  try {
    /* Так как этот миддлвар будет выполняться ОБЯЗАТЕЛЬНО после auth мидллвара у нас уже есть req.user */
    if (!req.user.role.includes('admin')) {
      return next(ApiError.forbidden());
    }

    next();
  } catch (error) {
    return next(ApiError.forbidden());
  }
};
