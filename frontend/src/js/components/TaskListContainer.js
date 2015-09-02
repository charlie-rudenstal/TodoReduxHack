import React from 'react';
import { connect } from 'react-redux';
import taskActions from '../actions/tasks';
import TaskList from './TaskList';

@connect(
	state => ({ tasks: state.tasks }),
	dispatch => ({
		onLoadTasks: () => dispatch(taskActions.loadTasks()),
		onCreateTask: () => dispatch(taskActions.createTask()),
	})
)
export default class TaskListContainer extends React.Component {

	constructor() {
		super(...arguments);
		this.props.onLoadTasks();
	}

	render() {
		return  (
			<div style={{ backgroundColor: 'white' }}>
				<h1>Todos</h1>
				<div>
					<input type="text" placeholder="What needs to be done?" />
					<button onClick={this.props.onCreateTask}>Add Todo</button>
				</div>

				<TaskList tasks={this.props.tasks} />

				<div>
					<div>{this.props.tasks.length} items left</div>
					<button>Mark all as complete</button>
				</div>
			</div>
		);
	}
}
