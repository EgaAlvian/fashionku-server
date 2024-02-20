import { celebrate, Segments, Joi } from "celebrate";

export const register = () => {
  return celebrate({
    [Segments.BODY]: Joi.object({
      fullname: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .message(
          "Password must have upper and lower case letters, must have random characters and must be at least 8 characters"
        ),
    }),
  });
};

export const login = () => {
  return celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  });
};
