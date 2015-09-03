import React from 'react';
import { connect } from 'react-redux';
import taskActions from '../actions/tasks';
import TaskList from './TaskList';
import { autobind } from 'core-decorators';

@connect(
	state => ({ tasks: state.tasks }),
	dispatch => ({
		onLoadTasks: () => dispatch(taskActions.loadTasks()),
		onCreateTask: (task) => dispatch(taskActions.createTask(task)),
	})
)
export default class TasksView extends React.Component {

	constructor() {
		super(...arguments);
		this.props.onLoadTasks();
	}

	@autobind
	handleCreateTask() {
		let txtNewTask = React.findDOMNode(this.refs.txtNewTask);
		let task = { text: txtNewTask.value, done: false };
		if (this.props.onCreateTask) {
			this.props.onCreateTask(task);
		}
	}

	render() {
		return  (
			<div style={{ backgroundColor: 'white' }}>
				<h1>Todos</h1>
				<div>
					<input ref='txtNewTask' type="text" placeholder="What needs to be done?" />
					<button onClick={this.handleCreateTask}>Add Todo</button>
				</div>

				<TaskList tasks={this.props.tasks} />

				<div>
					<div>{this.props.tasks.filter(t => !t.done).length} items left</div>
					<button>Mark all as complete</button>
				</div>
			</div>
		);
	}
}
