import React from "react";
import ToDoList from "./components/TodoList";
import "./styles.css";
import { connect } from "react-redux";

function App({ toDoList }) {
  return (
    <div className="container">
      <h1 className="center blue-text">Angular 9 MatTable CRUD Example</h1>
      <ToDoList />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    toDoList: state.toDoList
  };
};

export default connect(mapStateToProps)(App);
