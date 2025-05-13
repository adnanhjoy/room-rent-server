import multer from "multer";

interface StorageDestinationCallback {
    (error: Error | null, destination: string): void;
}

interface StorageFilenameCallback {
    (error: Error | null, filename: string): void;
}

const storage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, callback: StorageDestinationCallback) => {
        callback(null, "./uploaded_file/");
    },
    filename: (req: Express.Request, file: Express.Multer.File, callback: StorageFilenameCallback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
});

interface FileFilterCallback {
    (error: Error | null, acceptFile: boolean): void;
}

interface FileFilter {
    (req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback): void;
}

const fileFilter: FileFilter = (req, file, callback) => {
    if (
        file.fieldname === "photoUrl" ||
        file.fieldname === "images" ||
        file.fieldname === "heroImage" ||
        file.fieldname === "image"
    ) {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/gif" ||
            file.mimetype === "image/png"
        ) {
            callback(null, true);
        } else {
            callback(
                new Error("Only jpg, jpeg, png, gif, file format allowed!"),
                false
            );
        }
        callback(new Error("There was an unknown error!"), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // maximum file size 2MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;