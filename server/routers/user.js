const Router = require('express');
const router = new Router();
const UserController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const { check, body } = require('express-validator');
// const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/registration',
  check('email').isEmail().normalizeEmail().withMessage('Неверный формат email'),
  body('email').trim().escape(),
  check('login').isLength({ min: 3 }).withMessage('Минимальная дина логина 3 символа'),
  body('login').trim().escape(),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Минимальная дина пароля 5 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы 1 цифру'),
  UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/check', authMiddleware, UserController.check);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);

// router.get('/auth');

module.exports = router;
