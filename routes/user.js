//USer related code : like login /sign up

const express = require('express');
const router = express.Router();

const { handleUserSignUp, handleUserLogIn } = require('../controllers/user');

router.post('/', handleUserSignUp);
router.post('/login', handleUserLogIn);

module.exports = router;