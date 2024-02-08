const multer = require("multer");

// Inisialisasi multer dengan konfigurasi yang telah ditentukan
const upload = multer({
  storage: multer.memoryStorage(),
});

module.exports = upload;
