export interface Task {
    _id?: string;
    userId: string,
    content : string,
    date : Date,
    isDone ?: string,
}