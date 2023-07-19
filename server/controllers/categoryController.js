const { Category } = require('../models');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    
    return res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};


const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new Error('Missing Field');
    }

    Category.create({ name });
    res.status(201).json({message: 'Category successfully created', name})
  } catch (error) {
    console.error('There was and error creating category', error);
    res.status(500).json({error: "Internal Server Error"});
  }
}

const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findByPk(categoryId);
    
    if (!category) {
      res.status(404).json({error: "Category not found"});
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
}


const updateCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  try {
    const [rowsUpdated] = await Category.update(
      { name },
      { where: { category_id: categoryId } }
    )
    if (rowsUpdated === 0) {
      res.status(404).json({error: "Category not found"});
    }

    res.json({message: 'Category updated successfully'});

  } catch (error) {
    console.error('error:', error)
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const deleteCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).json({error: "Category not found"});
    }
    
    await category.destroy();

    res.json({ message: 'Category Deleted Successfully'});

  } catch (error) {
    console.error("error:", error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
}