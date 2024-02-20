import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Product = db.define("products", {
  name: DataTypes.STRING,
  price: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  description: DataTypes.STRING,
  image: DataTypes.STRING,
});

export default Product;

(async () => {
  await db.sync();
})();
