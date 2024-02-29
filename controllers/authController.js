const { User }= require('../models/User');
const { sendResetPasswordEmail } = require('../services/mailService');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const session = require('express-session')
const dotenv = require('dotenv');
dotenv.config();

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(409).json({
        status: 'fail',
        message: 'User already exists',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid password',
      });
    }
    // Set session
    req.session.userId = user.id;
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

 const logout = (req, res) => {
  req.session.destroy();
  res.status(204).json({
    status: 'success',
  });
};
const forgetPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = uuidv4();
    await User.update({ resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }, { where: { id: user.id } });
    await sendResetPasswordEmail(user, token);
    res.status(200).json({ message: 'Reset link sent to email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.params;
    const user = await User.findOne({ where: { resetPasswordToken: token } });
    if (!user) {
      return res.status(404).json({ message: 'Invalid reset link' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null }, { where: { id: user.id } });
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  signup,
  login,
  logout,
  forgetPassword,
  resetPassword,
};