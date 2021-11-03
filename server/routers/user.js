const Router = require('express');
const router = new Router();
const UserController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');
const { check, body } = require('express-validator');
// const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/check', authMiddleware, UserController.check);
router.post('/isactivationlinkexist', UserController.isActivationLinkExist);
router.post(
  '/activate',
  check('password')
    .isLength({ min: 5 })
    .withMessage('Минимальная длина пароля 5 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы 1 цифру'),
  UserController.activate
);
router.get('/refresh', UserController.refresh);
router.post(
  '/sendforgotpasswordlink',
  check('email').isEmail().normalizeEmail().withMessage('Неверный формат email'),
  UserController.sendForgotPasswordLink
);
router.post(
  '/restorepassword',
  check('newPassword')
    .isLength({ min: 5 })
    .withMessage('Минимальная длина пароля 5 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы 1 цифру'),
  UserController.restorePassword
);
router.post('/isrestorepasswordlinkexist', UserController.isRestorePasswordLinkExist);
router.post('/coins', authMiddleware, UserController.coins);
router.get('/users', authMiddleware, adminMiddleware, UserController.getUsers);

module.exports = router;
