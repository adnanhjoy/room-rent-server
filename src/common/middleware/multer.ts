import multer, { StorageEngine } from "multer";

const storage: StorageEngine = multer.diskStorage({
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

export default upload;