import TASK from "../models/taskModel";
import { Task } from "../../../types/Task";

export const taskRepositoryMongoDB = () => {

    const getTasksByUser = async (userId: string) => {
        return await TASK.find({userId});
    }
    
    const addTask = async (task : Task) => {
        return await TASK.create(task);
    }
    
   

    return {
        getTasksByUser,
        addTask,
    };
    
}

export type TaskRepositoryMongoDB = typeof taskRepositoryMongoDB;