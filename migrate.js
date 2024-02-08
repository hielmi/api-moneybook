const db = require("./models/indexModel");

const migrateDatabase = async () => {
  try {
    await db.dbConfig.sync({ force: true });
    console.log("Database migration completed successfully.");
  } catch (error) {
    console.error("Database migration failed:", error);
  }
};

migrateDatabase();
