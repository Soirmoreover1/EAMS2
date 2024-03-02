const { Company } = require('../models/Company');
const { Employee } = require('../models/Employee'); // Import the Employee model

// Create a new company
const createCompany = async (req, res) => {
  const { name, tax_number, website, location, industry, user_id } = req.body;

  try {
    const company = await Company.create({
      name,
      tax_number,
      website,
      location,
      industry,
      user_id,
    });

    res.status(201).json({
      status: 'success',
      data: {
        company,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Server error',
    });
  }
};
// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      include: [
        { model: Employee },
      ],
    });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: [
        { model: Employee },
      ],
    });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  try {
    const [updated] = await Company.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const updatedCompany = await Company.findByPk(req.params.id, {
      include: [
        { model: Employee },
      ],
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  try {
    const deleted = await Company.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};