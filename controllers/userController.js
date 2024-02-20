import User, {
  comparePassword,
  createJwtToken,
  hashPassword,
} from "../models/userModel.js";

export const register = async (req, res, next) => {
  const userInfo = req.body;

  try {
    const hashedPassword = hashPassword(userInfo.password);
    const newUser = await User.create({
      ...userInfo,
      password: hashedPassword,
    });

    delete newUser.dataValues.password;
    const token = createJwtToken(newUser);

    return res.status(200).json({
      user: newUser,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserByEmail = async (email) => {
  return User.findOne({
    where: {
      email: email,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginUser = await getUserByEmail(email);
    if (!loginUser) {
      return res.status(400).json({ msg: "Incorrect email or password" });
    }
    if (!comparePassword(password, loginUser.password)) {
      return res.status(400).json({ msg: "Incorrect email or password" });
    }

    delete loginUser.dataValues.password;
    delete loginUser.dataValues.token;

    const token = createJwtToken(loginUser);

    res.status(200).json({
      user: loginUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    user,
  });
};
