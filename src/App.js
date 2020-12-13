import React from "react";
// import ToDoList from "./components/TodoList";
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

const ToDoList = () => {
  return (
    <table>
      <tr>
        <th>id</th>
        <th>Title</th>
        <th>State</th>
        <th>Url</th>
        <th>Created At</th>
        <th>Updated At</th>
        <th>+</th>
      </tr>
      <tr>
        <td>id</td>
        <td>Title</td>
        <td>State</td>
        <td>Url</td>
        <td>Created At</td>
        <td>Updated At</td>
        <td>+</td>
      </tr>

    </table>
  );
}

const mapStateToProps = state => {
  return {
    toDoList: state.toDoList
  };
};

export default connect(mapStateToProps)(App);
