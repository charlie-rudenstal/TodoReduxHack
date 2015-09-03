import React from 'react';
import TaskItem from './TaskItem';
import cx from 'classnames';

export default class TaskList extends React.Component {

	render() {
		return  (
			<div className={cx('tasklist', 'checklist', this.props.className)}>
				{this.props.tasks.toSeq().map(task =>
					<TaskItem
						className={cx('checklist-item', { 'checklist-item_checked': task.get('done') })}
						key={task.get('uri')}
						task={task}
						onUpdateTask={this.props.onUpdateTask}
						onDeleteTask={this.props.onDeleteTask} />
				).toArray()} {/* toArray due to https://github.com/facebook/immutable-js/issues/554 */}
			</div>
		);
	}
}

