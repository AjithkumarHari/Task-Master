import { TaskRepositoryMongoDB } from "../../framework/database/repository/taskDbRepository";
import { Task } from "../../types/Task";

export const taskDbRepository = (repository : ReturnType<TaskRepositoryMongoDB>) => {

    const getTaskById = async (taskId: string) => await repository.getTaskById(taskId);
    
    const getTasksByUser = async (userId: string) => await repository.getTasksByUser(userId);
    
    const addTask = async (task: Task) => await repository.addTask(task);
    
    const deleteTask = async (taskId: string) => await repository.deleteTask(taskId);
    
    const updateTask = async (taskId: string, newStatus: boolean) => await repository.updateTask(taskId, newStatus);
    
    const editTask = async (taskId: string, newContent: string) => await repository.editTask(taskId, newContent);
    
    return {
        getTaskById,
        getTasksByUser,
        addTask,
        deleteTask,
        updateTask,
        editTask,
    }
}

export type TaskDbInterface = typeof taskDbRepository;