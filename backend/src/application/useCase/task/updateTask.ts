import { HttpStatus } from "../../../types/HttpStatus";
import { Task } from "../../../types/Task";
import AppError from "../../../util/appError";
import { TaskDbInterface } from "../../repository/taskDbRepository";

export const updateTask = async (taskId: string, taskRepository: ReturnType<TaskDbInterface>) => {
    try {
        console.log('task',taskId);
        const task: Task | null = await taskRepository.getTaskById(taskId); 
        console.log(task);
        
        if(task){
            const result: any = await taskRepository.updateTask(taskId, !task.isDone);
            console.log(result);
            
            if(!result)
                throw new AppError("Not Found", HttpStatus.NOT_FOUND);
            return {status: "success", message:"task status change success"};
        }
        throw new AppError("Task Not Updated", HttpStatus.NOT_FOUND);
    } catch (AppError) {
        return AppError;
    }
}