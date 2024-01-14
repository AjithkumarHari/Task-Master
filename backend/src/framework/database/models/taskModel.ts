import { model, Schema} from "mongoose";

const taskShcema = new Schema(
    {
        userId:{
            type : String,
            require : true,
        },
        content :{
            type : String,
            require : true,
        },
        date :{
            type : Date,
            require : true 
        },
        isDone : {
            type : Boolean,
            default: false
        },
        
    },
    { timestamps : true}
)

const TASK = model("Task", taskShcema, "tasks");

export default TASK;