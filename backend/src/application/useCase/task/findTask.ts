import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { TaskDbInterface } from "../../repository/taskDbRepository";

export const findTasks = async (
    userId: string,
    taskRepository: ReturnType<TaskDbInterface>) => {
    try {
        
        return await taskRepository.getTasksByUser(userId);
        
    } catch (AppError) {
        return AppError;
    }
} 