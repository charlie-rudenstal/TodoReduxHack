import React from 'react';

export default class TaskItem extends React.Component {

	render() {
		return  (
			<div>{this.props.task.title}</div>
		);
	}
}

