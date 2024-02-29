const express = require('express');
const router = express.Router();
const {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require('../controllers/attendanceController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');



router.post('/', createAttendance);
router.get('/', getAllAttendances);
router.get('/:id', getAttendanceById);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;