import React, { useState } from "react";

const AddForm = ({ addToDo }) => {
  const [content, setContent] = useState("");

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addToDo({ content: content });
    setContent(""); //empty the field
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add new todo:</label>
        <input type="text" onChange={handleChange} value={content} />
      </form>
    </div>
  );
};

export default AddForm;
