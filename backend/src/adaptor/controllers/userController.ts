import { Request, Response } from "express";
import { TaskDbInterface } from "../../application/repository/taskDbRepository";
import { TaskRepositoryMongoDB } from "../../framework/database/repository/taskDbRepository";
import AppError from "../../util/appError";
import { Task } from "../../types/Task";
import { addTask } from "../../application/useCase/task/addTask";
import { findTasks } from "../../application/useCase/task/findTask";

const userController = (
    taskDbRepository: TaskDbInterface,
    taskDbRepositoryImp: TaskRepositoryMongoDB,
) => {
    const dbTaskRepository = taskDbRepository(taskDbRepositoryImp());

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
    
    return {
        createTask,
        getTasks
    }

}

export default userController;