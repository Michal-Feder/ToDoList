
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Task } from './Interfaces/task.interface'
import { Icon, TextField, Dialog, DialogTitle, Button, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import { EditTaskProps } from './Interfaces/EditTask.interface';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';



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


const EditTask = (props: EditTaskProps) => {
  const { task, onClose, open } = props;
  const [editedTask, setEditedTask] = useState<Task>(task);

  const classes = useStyles();

  const handleClose = () => {
    onClose();
  }

  const IsFormChanged = () => {
    let isChanged = false
    Object.keys(editedTask).forEach((key, i) => {
      const newValue = Object.values(editedTask)[i];
      const oldValue = Object.values(task)[i];
      if (newValue !== oldValue) {
        isChanged = true;
        return;
      };
    });
    console.log("IsFormChange:  ", isChanged);
    return isChanged;
  }

  const save = () => {
    if (IsFormChanged())
      axios.put('http://localhost:3000/api/tasks', { data: editedTask }).then(res => {
        onClose();
      });
    else {
      onClose();
    }
  }

  return (


    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">עריכה</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="שם"
          type="text"
          fullWidth
          value={editedTask.username}
          onChange={(e) => setEditedTask({ ...editedTask, username: e.target.value })}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="טלפון"
          type="text"
          fullWidth
          value={editedTask.phone}
          onChange={(e) => setEditedTask({ ...editedTask, phone: e.target.value })}
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
          value={editedTask.email}
          onChange={(e) => setEditedTask({ ...editedTask, email: e.target.value })}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          id="date"
          margin="dense"
          label="תאריך יצירת המשימה"
          type="date"
          defaultValue="2017-05-24"
          //    value={editedTask.taskCreatedDate.format('yyyy-MM-dd')}
          onChange={(e) => setEditedTask({ ...editedTask, taskCreatedDate: new Date(e.target.value) })}
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
          value={editedTask.taskTitle}
          onChange={(e) => setEditedTask({ ...editedTask, taskTitle: e.target.value })}
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
          value={editedTask.taskDescription}
          onChange={(e) => setEditedTask({ ...editedTask, taskDescription: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={save} color="primary">
          שמירה
      </Button> <Button onClick={handleClose} color="primary">
          ביטול
      </Button>
      </DialogActions>
    </Dialog>

  );

}


export default EditTask;
