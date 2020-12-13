//step 6: create an initial state
const initState = {
    toDoList: [
      { id: 1, 
        content: "Bake a cake", 
        isDone: false, 
        state: "open", 
        url: "https://api.github.com/repos/angular/angular/issues/40098",
        createdAt: "2020-12-12T18:23:55Z",
        updatedAt: "2020-12-12T18:24:09Z"
      },
      { id: 2, 
        content: "Bake a cake", 
        isDone: false, 
        state: "open", 
        url: "https://api.github.com/repos/angular/angular/issues/40098",
        createdAt: "2020-12-12T18:23:55Z",
        updatedAt: "2020-12-12T18:24:09Z"}
    ]
  };
  
  //step 5: initialize a reducer function with two params
  const reducer = (state = initState, action) => {
    switch (action.type) {
      case "DELETE_TO_DO":
        //we dont want to do anything destructive
        const newToDos = state.toDoList.filter(
          item => item.id !== action.payload
        );
        return {
          ...state,
          toDoList: newToDos
        };
      case "NEW_TO_DO":
        action.payload.id = Math.random();
        action.payload.isDone = false;
        return {
          ...state,
          toDoList: [...state.toDoList, action.payload]
        };
      case "DONE_TO_DO":
        const tempList = state.toDoList.map(item => {
          item.id === action.payload && (item.isDone = !item.isDone);
          return item;
        });
        return {
          ...state,
          toDoList: tempList
        };
      default:
        break;
    }
    return state;
  };
  
  export default reducer;
  