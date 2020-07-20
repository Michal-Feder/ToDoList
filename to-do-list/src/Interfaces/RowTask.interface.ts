import { Task } from "./task.interface";

export interface RowTaskProps {
    task: Task;
    onCloseShow: () => void;
    onClickShow: () => void;
    onCloseEdit: () => void;
    onClickEdit: () => void;
}