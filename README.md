# Api-MoneyBook / BudgetGenius
REST API diperuntukan bagian backend dari aplikasi mobile BudgetGenius. BudgetGenius sendiri adalah nama aplikasi dari aplikasi pengelola keuangan berbasis android yang saya kembangkan untuk memenuhi tugas akhir dari Kuliah saya. REST API ini dibuat dengan menggunakan Teknologi:
- Node JS
- Express JS
- Sequalize ORM
- MySql 
- JWT Token

Berikut Dokumentasi dari hasil REST API dapat diliat di:
https://documenter.getpostman.com/view/20149750/2s9Ykt4JxL

Note:
- Clone repo
- masuk ke foldernya dan install package "npm install".
- Buat file .env dengan isi variabel:
  DB_HOST, DB_NAME, DB_USERNAME, dan DB_PASSWORD.
- Buat folder public/images dan public/files untuk menyimpan file.
- Lakukan migration tabel dengan perintah "npm run migrate"
- untuk run program dapat menjalankan
  "npm run dev" untuk development
  "npm run prod" untuk production
