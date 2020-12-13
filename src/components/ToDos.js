import React from "react";
import cx from "classnames";

const ToDos = ({ toDoList, doneToDo, deleteToDo, emptyText }) => {
  const tempList = toDoList.length ? (
    toDoList.map(todo => {
      return (
        <div className="collection-item" key={todo.id}>
          <span
            style={{
              textDecoration: todo.isDone ? "line-through" : "none"
            }}
            onClick={() => {
              doneToDo(todo.id);
            }}
          >
            {todo.content}
          </span>
          <a
            href="#~"
            onClick={() => {
              deleteToDo(todo.id);
            }}
            className="secondary-content"
          >
            <i className="material-icons red-text text-accent-1">delete</i>
          </a>
          <a
            href="#~"
            onClick={() => {
              doneToDo(todo.id);
            }}
            className="secondary-content"
          >
            <i
              className={cx("material-icons", {
                "blue-text text-lighten-4": !todo.isDone,
                "amber-text text-darken-2": todo.isDone
              })}
            >
              check
            </i>
          </a>
        </div>
      );
    })
  ) : (
    <p className="center">{emptyText}</p>
  );
  return <div className="collection">{tempList}</div>;
};

export default ToDos;
