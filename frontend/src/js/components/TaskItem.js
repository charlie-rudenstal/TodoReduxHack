import React from 'react';

export default class TaskItem extends React.Component {

	render() {
		return  (
			<div style={{ color: this.props.task.done ? 'gray' : 'black' }}>
				{this.props.task.text}
			</div>
		);
	}
}

