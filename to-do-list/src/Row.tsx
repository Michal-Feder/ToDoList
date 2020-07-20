
import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import AddTask from './AddTask'
import TaskToShow from './TaskToShow'
import { makeStyles, ThemeProvider, Theme, createStyles, createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Icon, Button } from '@material-ui/core';
import EditTask from './EditTask';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Task } from './Interfaces/task.interface';
import { green, grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        }, table: {
            minWidth: 650,
        },
    }),
);

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});



const Row = (props: Task) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openShow, setopenShow] = useState<boolean>(false);

    const [openAdd, setOpenAdd] = useState<boolean>(false);

    const deleteTask = (id: number) => {
        axios.delete(`http://localhost:3000/api/tasks/${id}`).then((res: AxiosResponse<any>) => {
        })
    }
    const handleCloseEdit = () => {
        setOpenEdit(false);

    };
    const handleCloseShow = () => {
        debugger;
        setopenShow(false);
        console.log('!!', openShow);

    };

    const handleClickOpenEdit = () => {
        setOpenEdit(true)
    };
    const handleClickOpenShow = () => {
        debugger;
        setopenShow(true);
        console.log('!!!', openShow);

    };

    const classes = useStyles();

    return (
        <TableRow key={props.task_id}>
            <TableCell key="username" component="th" scope="row">
                {props.username}
            </TableCell>
            <TableCell key="phone" align="right">{props.phone}</TableCell>
            <TableCell key="email" align="right">{props.email}</TableCell>
            <TableCell key="taskCreatedDate" align="right">{props.taskCreatedDate} </TableCell>
            <TableCell align="right">
                <IconButton onClick={handleClickOpenShow} aria-label="edit">
                    <VisibilityIcon />
                </IconButton>
                <IconButton onClick={handleClickOpenEdit} aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={(e) => deleteTask(props.task_id)} aria-label="edit">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
            {<EditTask task={props} open={openEdit} onClose={handleCloseEdit} />}
            <TaskToShow task={props} open={openShow} onClose={handleCloseShow}></TaskToShow>

        </TableRow>

    );

}


export default Row;
