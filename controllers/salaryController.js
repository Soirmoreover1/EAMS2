const { Salary } = require('../models');
const db = require('../models');

// Create a new salary
const createSalary = async (req, res) => {
  const { employee_id, gross_salary,net_salary,date } = req.body;

  try {
    const salary = await db.salary.create({
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
      message:error.message,
        });
  }
};

// Get all salaries
const getAllSalaries = async (req, res) => {
  try {
    const salaries = await db.salary.findAll({
      include: [
        { model: db.employee },
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
    const salary = await db.salary.findByPk(req.params.id, {
      include: [
        { model: db.employee },
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
    const [updated] = await db.salary.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Salary not found' });
    }
    const updatedSalary = await db.salary.findByPk(req.params.id, {
      include: [
        { model: db.employee },
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
    const deleted = await db.salary.destroy({
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