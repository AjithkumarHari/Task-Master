import { TaskDbInterface } from "../../repository/taskDbRepository";

export const deleteTask = async (
    taskId: string,
    taskRepository: ReturnType<TaskDbInterface>
) => {
    try{
        await taskRepository.deleteTask(taskId);
        return {"status":"success"}
    }catch(error){
        return error;
    }
}