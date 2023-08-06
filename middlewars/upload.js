import multer from "multer";

import path from "path";
const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const { _id } = req.user;
    // const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    // const filename = `${uniquePrefix}_${file.originalname}`;
    const filename = `${_id}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1280 * 1280 * 5,
};
const upload = multer({
  storage,
  limits,
});

export default upload;
