import { TaskDbInterface } from "../../repository/taskDbRepository";

export const findTasks = async (
    userId: string,
    taskRepository: ReturnType<TaskDbInterface>) => {
    try {
        return await taskRepository.getTasksByUser(userId);
    } catch (error) {
        return error;
    }
} 