import express from "express";
import userController from "../../../adaptor/controllers/userController";
import { taskDbRepository } from "../../../application/repository/taskDbRepository";
import { taskRepositoryMongoDB } from "../../database/repository/taskDbRepository";
import { userDbRepository } from "../../../application/repository/userDbRepository";
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
import { authServiceInterface } from "../../../application/service/authServiceInterface";
import { authService } from "../../service/authService";


const userRouter = () => {
    const router = express.Router()
    
    const controller = userController(
        taskDbRepository,
        taskRepositoryMongoDB,
        userDbRepository,
        userRepositoryMongoDB,
        authServiceInterface,
        authService,
    )

    router.get('/task-list/:userId',controller.getTasks);

    router.post('/add-task',controller.createTask);

    router.put('/update-task',controller.changeTaskStatus);
    
    router.put('/edit-task',controller.changeTaskContent);

    router.delete('/delete-task/:taskId',controller.removeTask);

    router.put('/update-user',controller.editUserDetails);

    return router;
}

export default userRouter;