import { TaskRepositoryMongoDB } from "../../framework/database/repository/taskDbRepository";
import { Task } from "../../types/Task";

export const taskDbRepository = (repository : ReturnType<TaskRepositoryMongoDB>) => {

    const getTasksByUser = async (userId: string) => await repository.getTasksByUser(userId);
    
    const addTask = async (task: Task) => await repository.addTask(task);
    

    return {
        getTasksByUser,
        addTask,
    }
}

export type TaskDbInterface = typeof taskDbRepository;