import express from "express";
import userController from "../../../adaptor/controllers/userController";
import { taskDbRepository } from "../../../application/repository/taskDbRepository";
import { taskRepositoryMongoDB } from "../../database/repository/taskDbRepository";


const userRouter = () => {
    const router = express.Router()
    
    const controller = userController(
        taskDbRepository,
        taskRepositoryMongoDB
    )

    router.get('/task-list/:userId',controller.getTasks);

    router.post('/add-task',controller.createTask);

    return router;
}

export default userRouter;