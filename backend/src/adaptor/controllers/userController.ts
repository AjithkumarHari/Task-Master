import { Request, Response } from "express";
import { TaskDbInterface } from "../../application/repository/taskDbRepository";
import { TaskRepositoryMongoDB } from "../../framework/database/repository/taskDbRepository";
import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { AuthServiceInterface } from "../../application/service/authServiceInterface";
import { AuthService } from "../../framework/service/authService";
import AppError from "../../util/appError";
import { Task } from "../../types/Task";
import { addTask } from "../../application/useCase/task/addTask";
import { findTasks } from "../../application/useCase/task/findTask";
import { deleteTask } from "../../application/useCase/task/deleteTask";
import { updateTaskStatus } from "../../application/useCase/task/updateTask";
import { updateTaskContent } from "../../application/useCase/task/updateTask";
import { updateUser } from "../../application/useCase/user/updateUser";
import { User } from "../../types/User";

const userController = (
    taskDbRepository: TaskDbInterface,
    taskDbRepositoryImp: TaskRepositoryMongoDB,
    userDbRepository: UserDbInterface,
    userDbRepositoryImp: UserRepositoryMongoDB,
    authServiceInterface: AuthServiceInterface,
    authServiceImp: AuthService
) => {
    const dbTaskRepository = taskDbRepository(taskDbRepositoryImp());
    const dbUserRepository = userDbRepository(userDbRepositoryImp());
    const authService = authServiceInterface(authServiceImp());

    const createTask = async (req: Request, res: Response) => {
        const task: Task = req.body;
        const result: any = await addTask(task, dbTaskRepository);
        if (result instanceof AppError) {
            res.status(result.errorCode).json({
                ...result
            })
        } else {
            res.json({
                ...result,
                message: "successfully added new task",
            });
        }
    }

    const removeTask = async (req: Request, res: Response) => {
        const taskId: string = req.params.taskId;
        const result: any = await deleteTask(taskId, dbTaskRepository);
        if (result instanceof AppError) {
            res.status(result.errorCode).json({
                ...result
            })
        } else {
            res.json({
                ...result,
                message: "successfully removed task",
            });
        }
    }

    const changeTaskStatus = async (req: Request, res: Response) => {
        const taskId: string = req.body.taskId;
        const result: any = await updateTaskStatus(taskId, dbTaskRepository);
        if (result instanceof AppError) {
            res.status(result.errorCode).json({
                ...result
            })
        } else {
            res.json({
                ...result,
                message: "successfully changed task",
            });
        }
    }
    
    const changeTaskContent = async (req: Request, res: Response) => {
        const {taskId, newContent} = req.body;
        const result: any = await updateTaskContent(taskId, newContent, dbTaskRepository);
        if (result instanceof AppError) {
            res.status(result.errorCode).json({
                ...result
            })
        } else {
            res.json({
                ...result,
                message: "successfully changed task",
            });
        }
    }

    const getTasks = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const result: any = await findTasks(userId, dbTaskRepository, );
        if (result instanceof AppError) {
            res.status(result.errorCode).json({
                ...result,
            })
        }  else {
            res.json(result);
        }
    }

    const editUserDetails = async (req: Request, res: Response) => {
        const user: User = req.body.user;
        const result: any = await updateUser(user, dbUserRepository, authService);
        console.log('end',result);
        
        if (result instanceof AppError) {
            res.status(result.errorCode).json({
                ...result
            })
        } else {
            res.json({
                ...result,
            });
        }
    }
    
    return {
        createTask,
        getTasks,
        removeTask,
        changeTaskStatus,
        changeTaskContent,
        editUserDetails,
    }

}

export default userController;