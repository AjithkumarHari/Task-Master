import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { TaskDbInterface } from "../../repository/taskDbRepository";

export const editTask = async (taskId: string, newContent: string, taskRepository: ReturnType<TaskDbInterface>) => {
    try {

        const result: any = await taskRepository.editTask(taskId, newContent );

        if(!result)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        return {status: "success", message:"task status change success"};

    } catch (AppError) {
        return AppError;
    }
}