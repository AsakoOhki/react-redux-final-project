import React from "react";

const FilterToDos = ({ filterVal, filterFunc }) => {
  return (
    <div className="container center">
      <button
        className={`spacing btn-small blue  ${
          filterVal === "SHOW_ALL" ? " darken-4" : "darken-1"
        }`}
        onClick={() => {
          filterFunc("SHOW_ALL");
        }}
      >
        All
      </button>
      <button
        className={`spacing btn-small blue  ${
          filterVal === "SHOW_ACTIVE" ? " darken-4" : "darken-1"
        }`}
        onClick={() => {
          filterFunc("SHOW_ACTIVE");
        }}
      >
        Active
      </button>
      <button
        className={`spacing btn-small blue  ${
          filterVal === "SHOW_COMPLETED" ? " darken-4" : "darken-1"
        }`}
        onClick={() => {
          filterFunc("SHOW_COMPLETED");
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterToDos;
