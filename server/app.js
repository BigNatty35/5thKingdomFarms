const express = require("express");
const app = express();
const db = require('./models/index');
const { 
  createUser, 
  getUserById, 
  updateUserById, 
  deleteUserById 
} = require('./controllers/userController');
const { 
  getAllProducts, 
  createProduct, 
  getProductById, 
  updateProductById, 
  deleteProductById 
} = require('./controllers/productController');

const {
  getAllCategories, 
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
} = require('./controllers/categoryController');


app.use(express.json());

//User routes
app.get("/users/:userId", getUserById);

app.post("/users/create", createUser);

app.post("/users/:userId", updateUserById);

app.delete('/users/:user_id', deleteUserById);

// Product Routes

app.get("/products", getAllProducts);

app.post("/products/create", createProduct);

app.get("/products/:productId", getProductById);

app.post('/products/:productId', updateProductById);

app.delete('/products/:productId', deleteProductById);

// Category Routes

app.get('/category', getAllCategories);

app.get('/category/:categoryId', getCategoryById);

app.post('/category/create', createCategory);

app.post('/category/:categoryId', updateCategoryById);

app.delete('/category/:categoryId', deleteCategoryById);

const PORT = 5050;

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT:${PORT}`);
  });
});