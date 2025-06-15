import express from 'express'
import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../Controllers/products.js';

const router = express.Router();

//add product
router.post('/add', addProduct)

//get products
router.get('/all', getProducts)

//get product  by id

router.get('/:id', getProductById)

//update by id
router.put('/:id',updateProductById)

//delet prodct by id

router.delete('/:id', deleteProductById)

export default router