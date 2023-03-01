const express = require('express');
const { registerUser, loginUser } = require('../controllers/AuthController');
const {
    fetchUserByIdUser,
    fetchTransactionByIdUser,
    fetchCategoryByIdUser,
    fetchPocketByIdUser,
    fetchSaldoByIdUser,
    fetchCategoryById,
    fetchPocketById,
    fetchTransactionById
} = require('../controllers/UserController');
const {
    addTransaction,
    addCategory,
    addPocket
} = require('../controllers/PostController');

const { updateCategory, updatePocket, updateUser } = require('../controllers/UpdateController');
const { deleteUser, deleteCategory, deletePocket } = require('../controllers/DeleteController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const UploadMiddleware = require('../middleware/UploadMiddleware');
const upload = require('../middleware/UploadMiddleware');

const router = express.Router();

// auth 
router.post('/register', registerUser);
router.post('/login', loginUser);

// get
router.get('/user', AuthMiddleware, fetchUserByIdUser);
router.get('/user/saldo', AuthMiddleware, fetchSaldoByIdUser)
router.get('/user/category', AuthMiddleware, fetchCategoryByIdUser);
router.get('/user/transaction', AuthMiddleware, fetchTransactionByIdUser);
router.get('/user/pocket', AuthMiddleware, fetchPocketByIdUser);

// getbyid
router.get('/user/category/:id', AuthMiddleware, fetchCategoryById)
router.get('/user/pocket/:id', AuthMiddleware, fetchPocketById)
router.get('/user/transaction/:id', AuthMiddleware, fetchTransactionById)

// post
router.post('/user/transaction', AuthMiddleware, addTransaction);
router.post('/user/category', AuthMiddleware, addCategory);
router.post('/user/pocket', AuthMiddleware, addPocket);

//update 
router.put('/user/category/:id', AuthMiddleware, updateCategory)
router.put('/user/pocket/:id', AuthMiddleware, updatePocket)
router.patch('/user', AuthMiddleware, UploadMiddleware.single('photoProfile'), updateUser)

//delete 
router.delete('/user/category/:id', AuthMiddleware, deleteCategory)
router.delete('/user/pocket/:id', AuthMiddleware, deletePocket)
router.delete('/user', AuthMiddleware, deleteUser)

module.exports = router;