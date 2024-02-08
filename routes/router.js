const express = require("express");
const { registerUser, loginUser } = require("../controllers/AuthController");
const {
  fetchUserByIdUser,
  fetchTransactionByIdUser,
  fetchCategoryByIdUser,
  fetchPocketByIdUser,
  fetchSaldoByIdUser,
  fetchCategoryById,
  fetchPocketById,
  fetchTransactionById,
  backupDataByIdUser,
  restoreDataByIdUser,
  fetchDebtById,
  fetchDebtByIdUser,
} = require("../controllers/UserController");
const {
  addTransaction,
  addCategory,
  addPocket,
  addDebt,
} = require("../controllers/PostController");

const {
  updateCategory,
  updatePocket,
  updateUser,
  updateDebt,
} = require("../controllers/UpdateController");
const {
  deleteUser,
  deleteCategory,
  deletePocket,
  deleteDebt,
} = require("../controllers/DeleteController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const UploadMiddleware = require("../middleware/UploadImageMiddleware");
const RestoreMiddleware = require("../middleware/UploadBackupMiddleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Service doesnt exist in this url");
});

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// get
router.get("/user", AuthMiddleware, fetchUserByIdUser);
router.get("/user/saldo", AuthMiddleware, fetchSaldoByIdUser);
router.get("/user/category", AuthMiddleware, fetchCategoryByIdUser);
router.get("/user/transaction", AuthMiddleware, fetchTransactionByIdUser);
router.get("/user/pocket", AuthMiddleware, fetchPocketByIdUser);
router.get("/user/debt", AuthMiddleware, fetchDebtByIdUser);
router.get("/user/backup", AuthMiddleware, backupDataByIdUser);

// getbyid
router.get("/user/category/:id", AuthMiddleware, fetchCategoryById);
router.get("/user/pocket/:id", AuthMiddleware, fetchPocketById);
router.get("/user/transaction/:id", AuthMiddleware, fetchTransactionById);
router.get("/user/debt/:id", AuthMiddleware, fetchDebtById);

// post
router.post("/user/transaction", AuthMiddleware, addTransaction);
router.post("/user/category", AuthMiddleware, addCategory);
router.post("/user/pocket", AuthMiddleware, addPocket);
router.post(
  "/user/restore",
  AuthMiddleware,
  RestoreMiddleware.single("file"),
  restoreDataByIdUser
);
router.post("/user/debt", AuthMiddleware, addDebt);

//update
router.put("/user/category/:id", AuthMiddleware, updateCategory);
router.put("/user/pocket/:id", AuthMiddleware, updatePocket);
router.patch(
  "/user",
  AuthMiddleware,
  UploadMiddleware.single("photoProfile"),
  updateUser
);
router.put("/user/debt/:id", AuthMiddleware, updateDebt);

//delete
router.delete("/user/category/:id", AuthMiddleware, deleteCategory);
router.delete("/user/pocket/:id", AuthMiddleware, deletePocket);
router.delete("/user/debt/:id", AuthMiddleware, deleteDebt);
router.delete("/user", AuthMiddleware, deleteUser);

module.exports = router;
