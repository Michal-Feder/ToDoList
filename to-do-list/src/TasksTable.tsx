
import React, { useState, useEffect } from 'react';
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
import Row from './Row';
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


const TasksTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openEditRow, setOpenEditRow] = useState<{}>();
  const [openShow, setOpenShow] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);


  useEffect(() => {
    getTasks()
  }, [])




  const getTasks = () => {
    axios.get('http://localhost:3000/api/tasks').then((res: AxiosResponse<any>) => {
      setTasks(res.data);
      console.log(tasks);

    })
  }

  const deleteTask = (id: number) => {
    axios.delete(`http://localhost:3000/api/tasks/${id}`).then((res: AxiosResponse<any>) => {
      getTasks();
    })
  }

  const handleClickOpenEdit = () => {
    setOpenEditRow(true)
  };
  const handleClickOpenShow = () => {
    setOpenShow(true);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseEdit = () => {
    setOpenEditRow(false);
    getTasks();
  };

  const handleCloseShow = () => {
    setOpenShow(false);
    getTasks();
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    getTasks();
  };


  const classes = useStyles();
  return (
    <div className="TasksTable">
      <ThemeProvider theme={theme} >
        <Button style={{ position: "relative", right: '35%', backgroundColor: 'green' }} variant="contained" color="primary" className={classes.margin} onClick={handleClickOpenAdd}>
          משימה חדשה
           <AddTask open={openAdd} onClose={handleCloseAdd} />
        </Button>

      </ThemeProvider>
      <TableContainer style={{ width: '80%', margin: 'auto' }} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead >
            <TableRow >
              <StyledTableCell style={{ backgroundColor: '#e6e6e6', color: 'black' }} align="right">שם משתמש</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#e6e6e6', color: 'black' }} align="right">טלפון</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#e6e6e6', color: 'black' }} align="right">מייל</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#e6e6e6', color: 'black' }} align="right">תאריך יצירת משימה</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#e6e6e6', color: 'black' }} align="right">פעולות</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <Row {...row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );

}


export default TasksTable;
