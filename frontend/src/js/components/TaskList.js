import React from 'react';
import TaskItem from './TaskItem';

export default class TaskList extends React.Component {

	render() {
		return  (
			<div>
				{this.props.tasks.toSeq().map(task =>
					<TaskItem
						key={task.get('uri')}
						task={task}
						onUpdateTask={this.props.onUpdateTask}
						onDeleteTask={this.props.onDeleteTask} />
				).toArray()} {/* toArray due to https://github.com/facebook/immutable-js/issues/554 */}
			</div>
		);
	}
}

