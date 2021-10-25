const { Schema, model, models } = require('mongoose');

const UserSchema = new Schema({
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  affiliation: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  restorePasswordLink: { type: String, default: null },
  role: { type: Array, default: ['user'] },
  isCookieAccepted: { type: Boolean, default: false },
});

module.exports = model('User', UserSchema);
