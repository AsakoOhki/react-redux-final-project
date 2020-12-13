import React, { useState } from "react";
import ToDos from "./ToDos";
import AddForm from "./AddForm";
import FilterToDos from "./FilterToDos";
import { deleteToDoAction } from "../actions/action";

//Step 8: We need to import a Higher Order Component
//this connect is a function that invoked to bring back a higher order component
//that connects this component to the redux store
import { connect } from "react-redux";


const ToDoList = ({
  toDoList
}) => {
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
  );
}

const ToDoListX = ({
  toDoList,
  removeToDo,
  newToDo,
  markToDo,
  completeTaskFilter,
  activeTaskFilter,
  allTaskFilter
}) => {
  // const [toDoList, setToDoList] = useState([]);
  const [filterVal, setFilterVal] = useState("SHOW_ALL");

  const deleteToDo = id => {
    // const afterFilter = toDoList.filter(item => item.id !== id);
    // setToDoList(afterFilter);
    removeToDo(id);
  };

  const addToDo = content => {
    // newToDo.id = Math.random();
    // newToDo.isDone = false;
    // setToDoList([...toDoList, newToDo]);
    newToDo(content);
  };

  const doneToDo = id => {
    // const tempList = toDoList.map(item => {
    //   item.id === id && (item.isDone = !item.isDone);
    //   return item;
    // });
    // setToDoList(tempList);
    markToDo(id);
  };

  const getVisibleToDos = (toDoList, filterVal) => {
    switch (filterVal) {
      case "SHOW_COMPLETED":
        return toDoList.filter(item => item.isDone);
      case "SHOW_ACTIVE":
        return toDoList.filter(item => !item.isDone);
      case "SHOW_ALL":
        return toDoList;
      default:
        break;
    }
  };

  const visibleList = getVisibleToDos(toDoList, filterVal);

  //just for fun-------------------------------------------
  //a message display for empty active/completed view
  const getCurrentView = filterVal => {
    switch (filterVal) {
      case "SHOW_COMPLETED":
        return "No completed task. Start doing something yo!!";
      case "SHOW_ACTIVE":
        return "No more Todo's!! Yatta!!!";
      default:
        return "Start doing something yo!!";
    }
  };

  const displayMessage = getCurrentView(filterVal);

  const filterFunc = action => {
    setFilterVal(action);
  };

  return (
    <>
      <FilterToDos filterFunc={filterFunc} filterVal={filterVal} />
      <ToDos
        toDoList={visibleList}
        doneToDo={doneToDo}
        deleteToDo={deleteToDo}
        filterVal={filterVal}
        emptyText={displayMessage}
      />
      <AddForm addToDo={addToDo} />
    </>
  );
};

//Step 10: accessing state of the store to this component as a props
//grab data from state and attach to the props
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
