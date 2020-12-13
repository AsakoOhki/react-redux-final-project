import React, { useState } from "react";
import ToDos from "./ToDos";
import AddForm from "./AddForm";
import FilterToDos from "./FilterToDos";
import { deleteToDoAction } from "../actions/action";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Step 8: We need to import a Higher Order Component
//this connect is a function that invoked to bring back a higher order component
//that connects this component to the redux store
import { connect } from "react-redux";

const ToDoList = ({
  toDoList
}) => {

  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [todoState, setTodoState] = useState("");
  const [url, setUrl] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "id") {
      setId(value)
    } else if (name === "title") {
      setTitle(value)
    } else if (name === "todoState") {
      setTodoState(value)
    } else if (name === "url") {
      setUrl(value)
    } else if (name === "createdat") {
      setCreatedAt(value)
    } else if (name === "updatedat") {
      setUpdatedAt(value)
    }
  }

  return (
    <>
      <table>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>State</th>
          <th>Url</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              +
            </Button>
          </th>
        </tr>
        {toDoList.map(toDo => (
          <tr>
            <td>{toDo.id}</td>
            <td>{toDo.content}</td>
            <td>{toDo.state}</td>
            <td>{toDo.url}</td>
            <td>{toDo.createdAt}</td>
            <td>{toDo.updatedAt}</td>
            <td>+</td>
          </tr>
        ))}
        
      </table>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new Issue</DialogTitle>
        <DialogContent>
          <TextField onChange={handleChange}
            error={false}
            autoFocus
            name="id"
            margin="dense"
            label="id *"
            type="text"
            fullWidth
            helperText="Required field"
            value={id}
          />
          <TextField onChange={handleChange}
            error={false}
            autoFocus
            name="title"
            margin="dense"
            label="Title *"
            type="text"
            fullWidth
            helperText="Required field"
          />
          <TextField onChange={handleChange}
            error={false}
            autoFocus
            name="todoState"
            margin="dense"
            label="State *"
            type="text"
            fullWidth
            helperText="Required field"
          />
          <TextField onChange={handleChange}
            error={false}
            autoFocus
            name="url"
            margin="dense"
            label="Url"
            type="text"
            fullWidth
            helperText="Required field"
          />
          <TextField onChange={handleChange}
            error={false}
            autoFocus
            name="createdat"
            margin="dense"
            label="Created At"
            type="text"
            fullWidth
            helperText="Required field"
          />
          <TextField onChange={handleChange}
            error={false}
            autoFocus
            name="updatedat"
            margin="dense"
            label="Updated At"
            type="text"
            fullWidth
            helperText="Required field"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
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
