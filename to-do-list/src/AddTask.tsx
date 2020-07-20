import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Icon, TextField, Dialog, DialogTitle, Button, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AddTaskProps } from './Interfaces/AddTask.interface';
import TasksTable from './TasksTable';

const AddTask = (props: AddTaskProps) => {
    const { onClose, open } = props;
    const [addTask, setAddTask] = useState({});
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                marginLeft: theme.spacing(3),
                marginRight: theme.spacing(3),
                padding: theme.spacing(5),
                width: 200,
            },
        }),
    );
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    }



    const save = () => {

        axios.post('http://localhost:3000/api/tasks', { data: addTask }).then(res => {
            onClose();
        });
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">משימה חדשה</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="שם"
                    type="text"
                    fullWidth
                    onChange={(e) => setAddTask({ ...addTask, username: e.target.value })}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="טלפון"
                    type="tel"
                    fullWidth
                    onChange={(e) => setAddTask({ ...addTask, phone: e.target.value })}
                />

            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="כתובת מייל"
                    type="email"
                    fullWidth
                    onChange={(e) => {
                        if (/.+@.+\.[A-Za-z]+$/.test(e.target.value)) {
                            setAddTask({ ...addTask, email: e.target.value });
                            let email = document.getElementById("email");
                            if (email) email.innerHTML = ""
                        }
                        else {
                            let email = document.getElementById("email");
                            if (email) email.innerHTML = "כתובת מייל לא תקינה"
                        }; console.log("mail???   ", /.+@.+\.[A-Za-z]+$/.test(e.target.value), e.target.children)
                    }}
                />
                <label id="email"></label>
            </DialogContent>
            <DialogContent>
                <TextField
                    id="date"
                    margin="dense"
                    label="תאריך יצירת המשימה"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={(e) => setAddTask({ ...addTask, taskCreatedDate: new Date(e.target.value) })}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    autoFocus
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="שם משימה"
                    type="text"
                    fullWidth
                    onChange={(e) => setAddTask({ ...addTask, taskTitle: e.target.value })}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="תוכן המשימה"
                    type="text"
                    fullWidth
                    onChange={(e) => setAddTask({ ...addTask, taskDescription: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={save} color="primary">
                    שמירה
          </Button>  <Button onClick={handleClose} color="primary">
                    ביטול
          </Button>
            </DialogActions>

        </Dialog>

    );

}


export default AddTask;
