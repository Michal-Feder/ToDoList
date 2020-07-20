import { Task } from "./task.interface";

export interface EditTaskProps {
  open: boolean;
  task: Task;
  onClose: () => void;
}