import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    },
    color: "secondary"
  }
});

const AddForm = ({
  toDo,
  onChange,
}) => {
  const classes = useStyles();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    onChange({
      ...toDo,
      [name]: value,
    });
  }

  return (
    <div>
      <TextField onChange={handleChange} 
        InputProps={{classes}} 
        error={toDo.id === ""}
        autoFocus
        color="secondary"
        name="id"
        margin="dense"
        label="id *"
        type="text"
        fullWidth
        helperText={toDo.id === "" ? "Required field" : undefined}
        value={toDo.id}
      />
      <TextField onChange={handleChange}
        InputProps={{classes}}
        error= {toDo.title === ""}
        name="title"
        margin="dense"
        label="Title *"
        type="text"
        fullWidth
        helperText={toDo.title === "" ? "Required field" : undefined}
        value={toDo.title}
      />
      <TextField onChange={handleChange}
        InputProps={{classes}}
        error= {toDo.todoState === ""}
        name="todoState"
        margin="dense"
        label="State *"
        type="text"
        fullWidth
        helperText={toDo.todoState === "" ? "Required field" : undefined}
        value={toDo.todoState}
      />
      <TextField onChange={handleChange}
        InputProps={{classes}}
        name="url"
        margin="dense"
        label="Url"
        type="text"
        fullWidth
        value={toDo.url}
      />
      <TextField onChange={handleChange}
        InputProps={{classes}}
        name="createdat"
        margin="dense"
        label="Created At"
        type="text"
        fullWidth
        value={toDo.createdAt}
      />
      <TextField onChange={handleChange}
        InputProps={{classes}}
        name="updatedat"
        margin="dense"
        label="Updated At"
        type="text"
        fullWidth
        value={toDo.updatedAt}
      />
    </div>
  );
};

export default AddForm;
