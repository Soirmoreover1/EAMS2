const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgetPassword,
  resetPassword
} = require('../controllers/authController'); // Correct the path and import from the correct file

const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const {  validateUser } = require('../middlewares/validationMiddleware');

router.post('/signup',validateUser, signup);
router.post('/login',validateUser, login);
router.post('/logout', logout);

module.exports = router;