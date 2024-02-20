import multer from "multer";

const fileType = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidFormat = fileType[file.mimetype];
    let uploadErr = new Error("Invalid image format");

    if (isValidFormat) {
      uploadErr = null;
    }

    cb(uploadErr, "assets/uploads");
  },
  filename: function (req, file, cb) {
    const extention = fileType[file.mimetype];
    const uniqueFileImage = `${file.fieldname}-${Date.now()}.${extention}`;

    cb(null, uniqueFileImage);
  },
});

export const upload = multer({ storage: storageFile });
