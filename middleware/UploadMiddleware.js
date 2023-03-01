const multer = require("multer");
const path = require('path');

// Konfigurasi multer untuk menentukan folder tujuan dan nama file yang akan disimpan
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/");
    },
    filename: function (req, file, cb) {
        // Tambahkan hash unik ke nama file untuk menghindari nama file yang sama
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// Filter hanya menerima file gambar dengan ekstensi jpg, png, dan jpeg
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, JPG, and PNG files are allowed."), false);
    }
};

// Inisialisasi multer dengan konfigurasi yang telah ditentukan
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;