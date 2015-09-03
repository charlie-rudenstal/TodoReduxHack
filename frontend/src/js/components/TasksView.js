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
		onUpdateTask: (task) => dispatch(taskActions.updateTask(task)),
		onDeleteTask: (uri) => dispatch(taskActions.deleteTask(uri)),
	})
)
export default class TasksView extends React.Component {

	constructor() {
		super(...arguments);
		this.props.onLoadTasks();
	}

	@autobind
	handleCreateTask(event) {
		let txtNewTask = React.findDOMNode(this.refs.txtNewTask);
		let task = { text: txtNewTask.value, done: false };
		if (this.props.onCreateTask) {
			this.props.onCreateTask(task);
		}
		txtNewTask.value = '';
		event.preventDefault();
	}

	render() {
		return  (
			<div style={{ backgroundColor: 'white' }}>
				<h1>Todos</h1>
				<form onSubmit={this.handleCreateTask}>
					<input ref='txtNewTask' type="text" placeholder="What needs to be done?" />
					<input type="submit" value="Add Todo" />
				</form>
				<TaskList
					tasks={this.props.tasks}
					onUpdateTask={this.props.onUpdateTask}
					onDeleteTask={this.props.onDeleteTask} />

				<div>
					<div>{this.props.tasks.filter(t => !t.get('done')).size} items left</div>
					<button>Mark all as complete</button>
				</div>
			</div>
		);
	}
}
