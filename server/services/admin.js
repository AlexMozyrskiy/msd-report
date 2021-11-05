const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail');
const TokenService = require('./token');
const UserDto = require('../dtos/user');
const ApiError = require('../exceptions/api-error');

const CLIENT_URL = process.env.PRODUCTION === 'true' ? process.env.PRODUCTION_CLIENT_URL : process.env.DEV_CLIENT_URL;

class AdminService {
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

  async coins(login, addCoins) {
    if (addCoins <= 0) {
      throw ApiError.badRequest('Нельзя добавить  ' + addCoins + ' коинов');
    }

    let user = await UserModel.findOne({ login });
    if (!user) {
      throw ApiError.badRequest('Пользователь с логином ' + login + ' не найден');
    }

    user.coins += addCoins;

    await user.save();

    await MailService.sendCoinsAddMail(user.email, user.login, addCoins, user.coins);

    return { addedCoins: addCoins, newCoinsCount: user.coins };
  }
}

module.exports = new AdminService();
