import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const specialistId = req.params.id;
    cb(
      null,
      `image-${specialistId}-${file.originalname.split(".")[0]}${path.extname(file.originalname)}`
    );
  }
});

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpg|jpeg|png|PNG/; // Valid file extensions
    const mimeTypes = /image\/jpeg|image\/png|image\/webp/; // Valid mime types

    const isValidExtname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const isValidMimetype = mimeTypes.test(file.mimetype);

    if (isValidExtname && isValidMimetype) {
      return cb(null, true);
    } else {
      cb(new Error("You can upload photos only in jpg, jpeg, png format!"));
    }
  }
});
