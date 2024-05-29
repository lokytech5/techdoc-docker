import express from "express";
import { dbConnect } from "./db/dbConnection";
import { userRouter } from "./routes/userRoutes";
import { authRouter } from "./routes/authRoutes";
import { projectRouter } from "./routes/projectRoute";
import { guideRouter } from "./routes/guideRoutes";
import cors from "cors";

const app = express();
const url = process.env.URL

async function initApp() {
    await dbConnect();

    app.use(cors({
        origin: url
    }));

    app.use(express.json())
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/projects', projectRouter);
    app.use('/api/guides', guideRouter);

    const PORT = 8000;
    app.listen(PORT, () => console.log(`listening to port ${PORT}`));
}

initApp().catch(console.error);