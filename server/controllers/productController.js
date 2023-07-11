const { Product } = require("../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    
    return res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}

const createProduct = async (req, res) => {
  try {
    const {name, description, price, stock_quantity, image_url  } = req.body;

    if (!name || !description || !price || !stock_quantity || !image_url) {
      throw new Error('Missing Fields');
    }

    Product.create({
      name, description, price, stock_quantity, image_url
    });
    res.status(201).json({ message: 'Product created successfully', name });
  } catch (error) {
    console.log('There was an error creating product:', error)
    res.status(500).json({error: 'Internal Server Error'});
  }
}

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      res.status(404).json({error: "Product not found"});
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
}


const updateProductById = async (req, res) => {
  const { productId } = req.params;
  const {name, description, price, stock_quantity, image_url  } = req.body;

  try {
    const [rowsUpdated] = await Product.update(
      {
        name, 
        description, 
        price, 
        stock_quantity, 
        image_url 
      },
      {
        where: { product_id: productId }
      }
    )
    if (rowsUpdated === 0) {
      res.status(404).json({error: "Product not found"});
    }

    res.json({message: 'Product updated successfully'});

  } catch (error) {
    console.error('error:', error)
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).json({error: "Product not found"});
    }
    
    await product.destroy();

    res.json({ message: 'Product Deleted Successfully'});

  } catch (error) {
    console.error("error:", error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}


module.exports = {
  createProduct, 
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
}