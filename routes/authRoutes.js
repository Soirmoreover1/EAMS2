const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgetPassword,
  resetPassword
} = require('../controllers/authController'); // Correct the path and import from the correct file

const { authMiddleware, checkRoles } = require('../middlewares/authMiddleware');
const {  validateAuth } = require('../middlewares/validationMiddleware');

router.post('/signup', checkRoles('admin'), validateAuth, signup);
router.post('/login', validateAuth, login);
router.post('/logout', authMiddleware, logout);

module.exports = router;
