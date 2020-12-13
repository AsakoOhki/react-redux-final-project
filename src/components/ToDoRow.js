import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const ToDoRow = ({ toDo }) => {
	return (
		<tr>
			<td>{toDo.id}</td>
			<td>{toDo.title}</td>
			<td>{toDo.todoState}</td>
			<td>{toDo.url}</td>
			<td>{toDo.createdAt}</td>
			<td>{toDo.updatedAt}</td>
			<td><CreateIcon color="secondary" /><DeleteIcon color="secondary"/></td>
		</tr>    
	)
}

export default ToDoRow
