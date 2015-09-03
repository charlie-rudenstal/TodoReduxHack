import React from 'react';
import { connect } from 'react-redux';
import taskActions from '../actions/tasks';
import TaskList from './TaskList';
import { autobind } from 'core-decorators';
import { Position } from './layout';

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
			<div className="content">
				<div className="content-header">
					<h1 className="header">Todos</h1>
				</div>

				<form className="content-item" onSubmit={this.handleCreateTask}>
					<input
						className="textinput"
						style={{ minWidth: '68%' }}
						ref='txtNewTask'
						type="text"
						placeholder="What needs to be done?"/>
					<input
						className="button"
						style={{ minWidth: '27%' }}
						type="submit"
						value="Add Todo" />
				</form>

				<TaskList
					tasks={this.props.tasks}
					onUpdateTask={this.props.onUpdateTask}
					onDeleteTask={this.props.onDeleteTask} />

				<div className="content-footer">
					<Position>
						<div className="label label_weak">
							{this.props.tasks.filter(t => !t.get('done')).size} items left
						</div>
						<Position.Right verticalCenter>
							<button className="button button_weak" title="Not implemented :(">
								Mark all as complete
							</button>
						</Position.Right>
					</Position>
				</div>

			</div>
		);
	}
}
