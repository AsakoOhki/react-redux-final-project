//step 6: create an initial state
const initState = {
    toDoList: [
      { id: "1", 
        title: "Casing issue in HttpClient", 
        todoState: "open", 
        url: "https://api.github.com/repos/angular/angular/issues/40098",
        createdAt: "2020-12-12T18:23:55Z",
        updatedAt: "2020-12-12T18:24:09Z"
      },
      { id: "2", 
        title: "perf(core): make DI decorators tree-shakable when used in `useFactory` deps config", 
        todoState: "open", 
        url: "https://api.github.com/repos/angular/angular/issues/40098",
        createdAt: "2020-12-12T18:23:55Z",
        updatedAt: "2020-12-12T18:24:09Z"
      }
    ],
    fliterText: ""
};

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
        
        action.payload.isDone = false;
        return {
          ...state,
          toDoList: [...state.toDoList, action.payload]
        };
      case "UPDATE_TO_DO":
        const updateToDo = state.toDoList.map(item => {
          if(item.id === action.payload.id) {
            return action.payload
          }
          return item;
        });
        return {
          ...state,
          toDoList: updateToDo
        };
      case "FILTER":
        return {
          ...state,
          fliterText: action.payload
        }
      default:
        break;
    }
    return state;
  };
  
  export default reducer;
  