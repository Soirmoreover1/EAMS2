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



router.post('/create', createAttendance);
router.get('/showall', getAllAttendances);
router.get('/show/:id', getAttendanceById);
router.put('/edit/:id', updateAttendance);
router.delete('/delete/:id', deleteAttendance);

module.exports = router;