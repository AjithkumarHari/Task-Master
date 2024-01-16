import TASK from "../models/taskModel";
import { Task } from "../../../types/Task";

export const taskRepositoryMongoDB = () => {

    const getTaskById = async (_id: string): Promise<Task | null> => {
        return await TASK.findOne({_id});
    }

    const getTasksByUser = async (userId: string) => {
        return await TASK.find({userId}).sort({ createdAt: -1 });
    }
    
    const addTask = async (task : Task) => {
        return await TASK.create(task);
    }
    
    const deleteTask = async (_id : string) => {
        return await TASK.deleteOne({_id});
    }

    const updateTask = async (_id: string, newStatus: boolean) => {
        return await TASK.updateOne({_id}, {$set:{isDone: newStatus}});
    }
    
    const editTask = async (_id: string, newContent: string) => {
        return await TASK.updateOne({_id}, {$set:{content: newContent}});
    }

    return {
        getTaskById,
        getTasksByUser,
        addTask,
        deleteTask,
        updateTask,
        editTask,
    };
    
}

export type TaskRepositoryMongoDB = typeof taskRepositoryMongoDB;