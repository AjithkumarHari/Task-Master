import { Task } from "../../../types/Task";
import { TaskDbInterface } from "../../repository/taskDbRepository";

export const addTask = async (
    task: Task,
    taskRepository: ReturnType<TaskDbInterface>
) => {
    try{
        await taskRepository.addTask(task);
        return {"status":"success"}
    }catch(error){
        return error;
    }
}