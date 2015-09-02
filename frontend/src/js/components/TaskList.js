import React from 'react';
import TaskItem from './TaskItem';

export default class TaskList extends React.Component {

	render() {
		return  (
			<div>
				{this.props.tasks.map(task =>
					<TaskItem key={this.props.tasks.indexOf(task)} task={task} />
				)}
			</div>
		);
	}
}

