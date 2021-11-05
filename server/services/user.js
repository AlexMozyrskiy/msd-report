const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail');
const TokenService = require('./token');
const UserDto = require('../dtos/user');
const ApiError = require('../exceptions/api-error');

const CLIENT_URL = process.env.PRODUCTION === 'true' ? process.env.PRODUCTION_CLIENT_URL : process.env.DEV_CLIENT_URL;

class UserService {
  async registration(login, email, affiliation, password) {
    let candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.badRequest('Пользователь с почтовым адресом ' + email + ' уже существует');
    }
    candidate = await UserModel.findOne({ login });
    if (candidate) {
      throw ApiError.badRequest('Пользователь с логином ' + login + ' уже существует');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      login,
      email,
      affiliation,
      password: hashPassword,
      activationLink,
    });
    await MailService.sendActivationMail(email, `${process.env.CLIENT_URL}/#/activate/${activationLink}`);

    /* так как нельзя отправлять можель, получим объект через ДТО с теми же свойствами что и модель */
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink, password) {
    try {
      const user = await UserModel.findOne({ activationLink });
      if (!user) {
        throw ApiError.badRequest('Некорректная ссылка активации');
      }

      const hashPassword = await bcrypt.hash(password, 3);

      user.password = hashPassword;
      user.isActivated = true;
      user.activationLink = null;

      await user.save();

      return { isActivated: true };
    } catch (error) {
      return 'Некорректная ссылка активации';
    }
  }

  async login(login, password) {
    const user = await UserModel.findOne({ login });
    if (!user) {
      throw ApiError.badRequest('Пользователь с таким login не найден');
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordsEqual) {
      throw ApiError.badRequest('Неверный пароль');
    }

    /* выбрасывем из модели все ненужное */
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findRefreshToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async check(accessToken) {
    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw ApiError.unauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async sendForgotPasswordLink(email) {
    let user = await UserModel.findOne({ email });

    if (user) {
      const restorePasswordLink = uuid.v4();
      await MailService.sendForgotPasswordMail(
        email,
        user.login,
        `${process.env.CLIENT_URL}/#/restorepassword/${restorePasswordLink}`
      );

      user.restorePasswordLink = restorePasswordLink;
      await user.save();
    }
  }

  async restorePassword(restorePasswordLink, newPassword) {
    let user = await UserModel.findOne({ restorePasswordLink });

    if (user) {
      const userDto = new UserDto(user);
      const hashPassword = await bcrypt.hash(newPassword, 3);
      user.restorePasswordLink = null;
      user.password = hashPassword;
      await user.save();

      return {
        user: userDto,
      };
    }
  }

  async isRestorePasswordLinkExist(restorePasswordLink) {
    let user = await UserModel.findOne({ restorePasswordLink });

    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async isActivationLinkExist(activationLink) {
    let user = await UserModel.findOne({ activationLink });

    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async coins(refreshToken, count) {
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findRefreshToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }

    const user = await UserModel.findById(userData.id);

    user.coins -= count;
    if (user.coins < 0) {
      throw ApiError.insufficientFunds();
    }

    await user.save();

    return {
      newCoinsCount: user.coins,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
