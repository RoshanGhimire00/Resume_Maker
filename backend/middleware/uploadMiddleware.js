import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/') // Specify the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

// File FILTER

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    
    // Fix: It's 'mimetype' not 'minetype'
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .jpg and .png files are allowed"), false);
    }
};

// Fix: Typo - 'fileFilter' not 'fileFileter'
const upload = multer({ 
    storage, 
    fileFilter, // Fixed the typo here
    limits: {
        fileSize: 5 * 1024 * 1024 // Optional: Limit file size to 5MB
    }
});

export default upload;
