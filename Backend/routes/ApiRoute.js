import express from "express";
import { getProducts , getProductById, createProduct, deleteProduct, updateProduct } from '../controllers/ProductController.js'
import { getUser, Register, Login, Logout} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// USER
router.get('/users', getUser);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// PRODUCT
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;