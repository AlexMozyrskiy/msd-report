const userService = require('../services/user');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await userService.login(login, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true,  // если используем https
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async isActivationLinkExist(req, res, next) {
    try {
      const { activationLink } = req.body;
      const isExist = await userService.isActivationLinkExist(activationLink);

      return res.json({ isExist });
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()));
      }

      const { activationLink, password } = req.body;
      const response = await userService.activate(activationLink, password);
      return res.json({ isActivated: response.isActivated });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true,  // если используем https
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async check(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;

      const accessToken = authorizationHeader.split(' ')[1];

      const userData = await userService.check(accessToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true,  // если используем https
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async sendForgotPasswordLink(req, res, next) {
    try {
      const { email } = req.body;
      await userService.sendForgotPasswordLink(email);

      return res.json({ isLinkSend: true });
    } catch (error) {
      next(error);
    }
  }

  async restorePassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()));
      }

      const { restorePasswordLink, newPassword } = req.body;
      const userData = await userService.restorePassword(restorePasswordLink, newPassword);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async isRestorePasswordLinkExist(req, res, next) {
    try {
      const { restorePasswordLink } = req.body;
      const isExist = await userService.isRestorePasswordLinkExist(restorePasswordLink);

      return res.json({ isExist });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
