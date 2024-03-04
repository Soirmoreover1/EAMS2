const { Salary } = require('../models/Salary');
const db = require('../models/index');

// Create a new salary
const createSalary = async (req, res) => {
  const { employee_id, gross_salary,net_salary,date } = req.body;

  try {
    const salary = await Salary.create({
      employee_id,
      gross_salary,
      net_salary,
      date,
    });

    res.status(201).json({
      status: 'success',
      data: {
        salary,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Server error',
    });
  }
};

// Get all salaries
const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.findAll({
      include: [
        { model: db.Employee },
      ],
    });
    res.status(200).json(salaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a salary by ID
const getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findByPk(req.params.id, {
      include: [
        { model: db.Employee },
      ],
    });
    if (!salary) {
      return res.status(404).json({ message: 'Salary not found' });
    }
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a salary
const updateSalary = async (req, res) => {
  try {
    const [updated] = await Salary.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Salary not found' });
    }
    const updatedSalary = await Salary.findByPk(req.params.id, {
      include: [
        { model: db.Employee },
      ],
    });
    res.status(200).json(updatedSalary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a salary
const deleteSalary = async (req, res) => {
  try {
    const deleted = await Salary.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Salary not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSalary,
  getAllSalaries,
  getSalaryById,
  updateSalary,
  deleteSalary,
};