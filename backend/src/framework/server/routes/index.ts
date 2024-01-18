import { Application } from "express";
import userRouter from "./user";
import authRouter from "./auth";
import userAuthMiddle from "../middlewares/userAuthMiddleware";

const routes = (app: Application) => {
    app.use('/api/user',userAuthMiddle,userRouter())
    app.use('/api/auth',authRouter())
}

export default routes 