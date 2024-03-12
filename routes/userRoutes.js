const express = require('express');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const {
  createUser,
  getUserProfile,
  updateUser,
  deleteUser,
  getAllUser,
} = require('../controllers/userController');
const { validateUser } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/create', checkRoles('admin'),validateUser, createUser);
router.get('/profile/:id', checkRoles('admin'), getUserProfile);
router.get('/allprofile', checkRoles('admin'), getAllUser);
router.put('/edit/:id', checkRoles('admin'), validateUser, updateUser);
router.delete('/delete/:id', checkRoles('admin'), deleteUser);

module.exports = router;