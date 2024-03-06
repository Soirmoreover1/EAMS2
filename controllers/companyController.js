const { Company } = require('../models');
const db = require('../models');

// Create a new company
const createCompany = async (req, res) => {
  const { name, tax_number,manager, website, location, industry, user_id } = req.body;
 
  try {
    const company = await db.company.create({
      name,
      tax_number,
      manager,
      website,
      location,
      industry,
      user_id,
    });

    res.status(201).json( {
      status: ' create company successfully',
     data: {
       company
      },
   });
  } catch (error) {

    res.status(500).json({
      status: 'fail',
      message: error.message ,
    });
  }
};
// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await db.company.findAll({
      include: [
        { model: db.employee },
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
    const company = await db.company.findByPk(req.params.id, {
      include: [
        { model: db.employee },
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
    const [updated] = await db.company.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const updatedCompany = await db.company.findByPk(req.params.id, {
      include: [
        { model: db.employee,as: 'employees' },
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
    const deleted = await db.company.destroy({
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