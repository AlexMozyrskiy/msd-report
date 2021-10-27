const AdminService = require('../services/admin');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class AdminController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()));
      }

      const { login, email, affiliation, password } = req.body;
      /* const userData = */ await AdminService.registration(login, email, affiliation, password);

      /* закомментировали, так как регистрация пока что закрытая и нам не надо возвращать на фронт информацию о юзере */
      //   res.cookie('refreshToken', userData.refreshToken, {
      //     maxAge: 30 * 24 * 60 * 60 * 1000,
      //     httpOnly: true,
      //     // secure: true,  // если используем https
      //   });

      // return res.json(userData);  закомментировали, так как регистрация пока что закрытая и нам не надо возвращать на фронт информацию о юзере
      return res.json({ isRegistered: true });
    } catch (error) {
      next(error);
    }
  }

  async coins(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()));
      }

      const { login, addCoins } = req.body;
      const response = await AdminService.coins(login, addCoins);

      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
