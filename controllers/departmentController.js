const { Department } = require('../models');
 // Import the Employee model
const db = require('../models');

// Create a new department
const createDepartment= async (req, res) => {
  const { name,manager_id,company_id} = req.body;

  try {
    const department = await db.department.create({
      name,
      manager_id,
      company_id
    });

    res.status(201).json({
      status: 'success',
      data: {
        department,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await db.department.findAll({
      include: [
        { model: db.employee },
        { model: db.company },
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
    const department = await db.department.findByPk(req.params.id, {
      include: [
        { model: db.employee },
        { model: db.company },
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
    const [updated] = await db.department.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Department not found' });
    }
    const updatedDepartment = await db.department.findByPk(req.params.id, {
      include: [
        { model: db.employee },
        { model: db.company },
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
    const deleted = await db.department.destroy({
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