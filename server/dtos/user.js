/*
  dto - data transfer object
  Это класс обладающий определенными полями, которые будем отправлять на клиент
*/

module.exports = class UserDto {
  login;
  email;
  affiliation;
  id;
  isActivated;
  coins;
  role;

  constructor(model) {
    this.login = model.login;
    this.email = model.email;
    this.affiliation = model.affiliation;
    this.id = model._id; // монго к id добавляет нижнее подчеркивание
    this.isActivated = model.isActivated;
    this.coins = model.coins;
    this.role = model.role;
  }
};
