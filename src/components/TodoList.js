import React, { useState } from "react";
import { deleteToDoAction } from "../actions/action";
import AddForm from './AddForm';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';


//Step 8: We need to import a Higher Order Component
//this connect is a function that invoked to bring back a higher order component
//that connects this component to the redux store
import { connect } from "react-redux";
import ToDoRow from "./ToDoRow";

const ToDoList = ({
  toDoList,
  newToDo
}) => {

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
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
      isDone: toDo.isDone,
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
    
  }



  return (
    <>
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
              <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <AddIcon/>
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {toDoList.map(toDo => (
            <ToDoRow  key={toDo.id} toDo={toDo} onEditClick={onEditClick}/>     
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
    </>
  );
}


const mapStateToProps = state => {
  return {
    toDoList: state.toDoList
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
    markToDo: id => {
      dispatch({ type: "DONE_TO_DO", payload: id });
    },
    completeTaskFilter: text => {
      dispatch({
        type: "TASK_COMPLETED_FILTER",
        payload: text
      });
    },
    activeTaskFilter: text => {
      dispatch({
        type: "TASK_ACTIVE_FILTER",
        payload: text
      });
    },
    allTaskFilter: text => {
      dispatch({
        type: "TASK_ALL_FILTER",
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
