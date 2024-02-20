import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authentication = async (req, res, next) => {
  const accessToken = req.headers["authorization"];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);

    const findOneUserById = (id) => {
      return User.findOne({
        where: {
          id: id,
        },
      });
    };

    const user = await findOneUserById(decoded.id);

    if (!user) next(new Error("invalid Token"));

    delete user.dataValues.password;

    req.user = user;
  } catch (error) {
    next(new Error("Invalid Token"));
  }

  next();
};

