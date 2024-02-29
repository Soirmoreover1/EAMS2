const { Department } = require('../models/Department');

// Create a new department
const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [
        { model: Employee },
        { model: Company },
      ],
    });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a department by ID
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id, {
      include: [
        { model: Employee },
        { model: Company },
      ],
    });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a department
const updateDepartment = async (req, res) => {
  try {
    const [updated] = await Department.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Department not found' });
    }
    const updatedDepartment = await Department.findByPk(req.params.id, {
      include: [
        { model: Employee },
        { model: Company },
      ],
    });
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  try {
    const deleted = await Department.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};