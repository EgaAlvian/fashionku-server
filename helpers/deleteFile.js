import fs from "fs";

export const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      res.status(404);
      throw new Error("File not found");
    }
  });
};
