// require("dotenv").config;
import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DB_TABLE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export default db;
