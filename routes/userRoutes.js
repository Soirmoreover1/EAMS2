const express = require('express');
const { authMiddleware,checkRoles } = require('../middlewares/authMiddleware');
const {
  createUser,
  getUserProfile,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { validateUser } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/', checkRoles('admin'),validateUser, createUser);
router.get('/profile', checkRoles('admin'),authMiddleware, getUserProfile);
router.put('/:id', checkRoles('admin'),authMiddleware, validateUser, updateUser);
router.delete('/:id', checkRoles('admin'),authMiddleware, validateUser, deleteUser);

module.exports = router;