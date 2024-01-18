import { HttpStatus } from "../../../types/HttpStatus";
import { Task } from "../../../types/Task";
import AppError from "../../../util/appError";
import { TaskDbInterface } from "../../repository/taskDbRepository";

export const updateTaskStatus = async (taskId: string, taskRepository: ReturnType<TaskDbInterface>) => {
    try {
        const task: Task | null = await taskRepository.getTaskById(taskId); 
        if(task){
            const result: any = await taskRepository.updateTask(taskId, !task.isDone);
            if(!result)
                throw new AppError("Not Found", HttpStatus.NOT_FOUND);
            return {status: "success", message:"task status change success"};
        }
        throw new AppError("Task Not Updated", HttpStatus.NOT_FOUND);
    } catch (AppError) {
        return AppError;
    }
}

export const updateTaskContent = async (taskId: string, newContent: string, taskRepository: ReturnType<TaskDbInterface>) => {
    try {
        const result: any = await taskRepository.editTask(taskId, newContent );
        if(!result)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        return {status: "success", message:"task status change success"};
    } catch (AppError) {
        return AppError;
    }
}