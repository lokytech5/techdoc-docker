import multer from "multer";

const inMermoryStorage = multer.memoryStorage();

const uploadStrategy = multer({
    storage: inMermoryStorage
}).single('file');

export default uploadStrategy;