const Router = require('express');
const router = new Router();
const AdminController = require('../controllers/admin');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');
const { check, body } = require('express-validator');

router.post(
  '/registration',
  check('email').isEmail().normalizeEmail().withMessage('Неверный формат email'),
  body('email').trim().escape(),
  check('login').isLength({ min: 3 }).withMessage('Минимальная длина логина 3 символа'),
  body('login').trim().escape(),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Минимальная длина пароля 5 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы 1 цифру'),
  authMiddleware,
  adminMiddleware,
  AdminController.registration
);

router.post('/coins', authMiddleware, adminMiddleware, AdminController.coins);

module.exports = router;
