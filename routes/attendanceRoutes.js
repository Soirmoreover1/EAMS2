const express = require('express');
const router = express.Router();
const {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require('../controllers/attendanceController');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreateAttendance } = require('../middlewares/validationMiddleware');


router.post('/create', validateCreateAttendance,createAttendance);
router.get('/showall', getAllAttendances);
router.get('/show/:id', getAttendanceById);
router.put('/edit/:id', validateCreateAttendance ,updateAttendance);
router.delete('/delete/:id', deleteAttendance);

module.exports = router;