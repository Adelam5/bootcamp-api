import express from "express";
import dotent from "dotenv";
dotent.config({ path: "./src/config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`
    Server running in ${process.env.NODE_ENV} mode on port ${PORT}
`)
);
