const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const { registerValidation, validate } = require('../middlewares/validators');

router.post('/register', registerValidation, validate, authController.register);

// POST register
router.post('/register', authController.register);

// POST login
router.post('/login', authController.login);

module.exports = router;
