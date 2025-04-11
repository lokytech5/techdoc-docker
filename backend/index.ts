import express from "express";
import cors from "cors";
import {userRouter} from './routes/userRoutes'
import { dbConnect } from "./db/dbConnection";
import { authRoute } from "./routes/authRoutes";
import { projectRouter } from "./routes/projectRoutes";
import { guideRouter } from "./routes/guideRoutes";
import { codeAnalysisRouter } from "./routes/codeAnaysisRoutes";

const app = express();
const url = "https://techdoc-iota.vercel.app/"

async function initApp() {
    await dbConnect();

    app.use(cors({
        origin: url,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(express.json());
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRoute);
    app.use('/api/projects', projectRouter);
    app.use('/api/guides', guideRouter);
    app.use('/api/analyze', codeAnalysisRouter );
    const PORT = 8001;
    app.listen(PORT, () => console.log(`listening to port ${PORT}`));
}

initApp().catch(console.error);

