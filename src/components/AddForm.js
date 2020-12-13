import React from "react";
import TextField from '@material-ui/core/TextField';

const AddForm = ({
  toDo,
  onChange,
}) => {
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
        error={toDo.id === ""}
        autoFocus
        name="id"
        margin="dense"
        label="id *"
        type="text"
        fullWidth
        helperText={toDo.id === "" ? "Required field" : undefined}
        value={toDo.id}
      />
      <TextField onChange={handleChange}
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
        name="url"
        margin="dense"
        label="Url"
        type="text"
        fullWidth
        value={toDo.url}
      />
      <TextField onChange={handleChange}
        name="createdat"
        margin="dense"
        label="Created At"
        type="text"
        fullWidth
        value={toDo.createdAt}
      />
      <TextField onChange={handleChange}
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
