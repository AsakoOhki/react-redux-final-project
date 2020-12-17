import React from "react";
import "./App.css";
import ToDoList from "./components/TodoList";
import { connect } from "react-redux";
import RefreshIcon from '@material-ui/icons/Refresh';
import Box from '@material-ui/core/Box';


function App() {
  return (
    <>
      <Box
        boxShadow={3}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '100%', height: '90%'}}
      >
        <Box display="flex"   style={{ justifyContent: "space-between", backgroundColor: 'blue', color:"white", width: '100%', padding: "10px", marginBottom: "20px"}}>
          <h5>Angular 9 MatTable CRUD Example</h5>
          <h5>Reload data: <RefreshIcon style={{ fontSize: "25px"}}/></h5>
        </Box>      
        <ToDoList />
     </Box>
    
    </>
  );
}

const mapStateToProps = state => {
  return {
    toDoList: state.toDoList
  };
};

export default connect(mapStateToProps)(App);
