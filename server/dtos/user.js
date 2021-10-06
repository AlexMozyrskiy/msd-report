/*
  dto - data transfer object
  Это класс обладающий определенными полями, которые будем отправлять на клиент
*/

module.exports = class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id; // монго к id добавляет нижнее подчеркивание
    this.isActivated = model.isActivated;
  }
};
