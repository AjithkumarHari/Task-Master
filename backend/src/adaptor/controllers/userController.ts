import { Request, Response } from "express";
import { TaskDbInterface } from "../../application/repository/taskDbRepository";
import { TaskRepositoryMongoDB } from "../../framework/database/repository/taskDbRepository";
import AppError from "../../util/appError";
import { Task } from "../../types/Task";
import { addTask } from "../../application/useCase/task/addTask";
import { findTasks } from "../../application/useCase/task/findTask";
import { deleteTask } from "../../application/useCase/task/deleteTask";
import { updateTask } from "../../application/useCase/task/updateTask";
import { editTask } from "../../application/useCase/task/editTask";

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
        const result: any = await updateTask(taskId, dbTaskRepository);
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
        const result: any = await editTask(taskId, newContent, dbTaskRepository);
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
    
    return {
        createTask,
        getTasks,
        removeTask,
        changeTaskStatus,
        changeTaskContent,
    }

}

export default userController;