import { isCelebrateError } from "celebrate";

export const errorHandler = (err, req, res, next) => {
  let errMessage = err.message;
  let statusCode = 400;
  if (isCelebrateError(err)) {
    if (err.details.get("body")) {
      errMessage = err.details.get("body").message;
    } else if (err.details.get("params")) {
      errMessage = err.details.get("params").message;
    } else if (err.details.get("query")) {
      errMessage = err.details.get("query").message;
    }
    errMessage = errMessage.replace(/"/g, "");
    statusCode = 422;
  }

  return res.status(statusCode).json({ error: errMessage });
};
