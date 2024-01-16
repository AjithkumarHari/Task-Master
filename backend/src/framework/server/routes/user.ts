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

    router.put('/update-task',controller.changeTaskStatus);
    
    router.put('/edit-task',controller.changeTaskContent);

    router.delete('/delete-task/:taskId',controller.removeTask);

    return router;
}

export default userRouter;