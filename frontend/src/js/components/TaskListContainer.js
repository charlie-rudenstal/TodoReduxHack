import React from 'react';
import TaskList from './TaskList';

export default class TaskListContainer extends React.Component {

	render() {
		return  (
			<div style={{ backgroundColor: 'white' }}>
				<h1>Todos</h1>
				<div>
					<input type="text" placeholder="What needs to be done?" />
					<button>Add Todo</button>
				</div>

				<TaskList />

				<div>
					<div>2 items left</div>
					<button>Mark all as complete</button>
				</div>
			</div>
		);
	}
}
