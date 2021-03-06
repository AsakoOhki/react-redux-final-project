import React, { useState } from "react";
import { deleteToDoAction } from "../actions/action";
import { connect } from "react-redux";
import AddForm from './AddForm';
import ToDoRow from "./ToDoRow";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    },
    
  }
});

const ToDoList = ({
  newToDo,
  updateToDo,
  removeToDo,
  fliter,
  fliteredList
}) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editingToDo, setEditingToDo] = useState({
    id: "",
    title: "",
    isDone: "",
    todoState: "",
    url: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setEditingToDo({
      id: "",
      title: "",
      isDone: "",
      todoState: "",
      url: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  const handleSave = () => {
    newToDo(editingToDo);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (updatedToDo) => {
    setEditingToDo(updatedToDo);
  }

  const onEditClick = ({ toDo }) => {
    setOpenEdit(true);
    setEditingToDo({
      id: toDo.id,
      title: toDo.title,
      todoState: toDo.todoState,
      url: toDo.url,
      createdAt: toDo.createdAt,
      updatedAt: toDo.updatedAt,
    });
  }

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEdit = () => {
    updateToDo(editingToDo);
    setOpenEdit(false);
  }

  const onDeleteClick = ({ toDo }) => {
    setOpenDelete(true);
    setEditingToDo({
      id: toDo.id,
      title: toDo.title,
      todoState: toDo.todoState,
      url: toDo.url
    });
  }

  const handleDeleteClose = () => {
    setOpenDelete(false);
  }

  const handleDelete = () => {
    removeToDo(editingToDo.id);
    setOpenDelete(false);
  }

  const handleFilter = (event) => {
    const value = event.target.value;
    fliter(value);
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <TextField id="standard-basic"　label="Fliter Issues" fullWidth onChange={handleFilter} InputProps={{classes}}  autoFocus/>
      </form>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>State</th>
            <th>Url</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>
              <Button onClick={handleClickOpen}>
                <AddIcon />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {fliteredList.map(toDo => (
            <ToDoRow  key={toDo.id} toDo={toDo} onEditClick={onEditClick} onDeleteClick={onDeleteClick}/>     
          ))}
        </tbody>        
      </table>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new Issue</DialogTitle>
        <DialogContent>
          <AddForm toDo={editingToDo} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSave}
            color="primary"
            disabled={editingToDo.id === "" || editingToDo.title === "" || editingToDo.todoState === ""}
          >
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleEditClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Issue id: {editingToDo.id}</DialogTitle>
        <DialogContent>
          <AddForm toDo={editingToDo} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEdit}
            color="primary"
            disabled={editingToDo.id === "" || editingToDo.title === "" || editingToDo.todoState === ""}
          >
            Save
          </Button>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleDeleteClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <p>id:{editingToDo.id}</p> 
          <p>Title:{editingToDo.title}</p>
          <p>State:{editingToDo.todoState}</p>
          <p>Url:{editingToDo.url}</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            color="primary"
          >
            Delete
          </Button>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


const mapStateToProps = state => {
  return {
    toDoList: state.toDoList,
    fliteredList: state.toDoList.filter((item)=> {
      if(state.fliterText === "") {
        return true
      } 
      return item.id === state.fliterText || item.title.includes(state.fliterText);
    })
  };
};

//Step 11:
// store.dispatch({type: DO_SOMETHING});
//interacting with the state from this component
const mapDispatchToProps = dispatch => {
  return {
    //map a function with a parameter
    //deletePost: (id) -> { dispatch() }
    removeToDo: id => {
      dispatch(deleteToDoAction(id));
    },
    newToDo: content => {
      dispatch({ type: "NEW_TO_DO", payload: content });
    },
    updateToDo: content => {
      dispatch({ type: "UPDATE_TO_DO", payload: content });
    },
    fliter: text => {
      dispatch({
        type: "FILTER",
        payload: text
      });
    }
  };
};

//Step 9: we invoke connect that returns a higher order compoment,
//which wraps around ToDoList
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList);
