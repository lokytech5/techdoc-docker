import multer from "multer";

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({
    storage: inMemoryStorage
}).single('file');

export default uploadStrategy;