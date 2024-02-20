import { Sequelize } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { DataTypes } = Sequelize;

const User = db.define("users", {
  fullname: DataTypes.STRING,
  username: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
});

export const createJwtToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY
  );
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export default User;

(async () => {
  await db.sync();
})();
