import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { EditTaskProps } from './Interfaces/EditTask.interface';
import { Task } from './Interfaces/task.interface';

const TaskToShow = (props: EditTaskProps) => {
    const { task, onClose, open } = props;
    const [taskToShow, setEditedTask] = useState<Task>(task);
    console.log("????", open);

    const closeModal = () => {
        debugger;
        onClose();
    }

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & { children?: React.ReactElement<any, any> },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    return (

        <div className="Task">

            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{taskToShow.taskTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {taskToShow.taskDescription}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        סגור
          </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default TaskToShow;
