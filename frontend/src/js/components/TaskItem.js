import React from 'react';
import { autobind } from 'core-decorators';

export default class TaskItem extends React.Component {

	@autobind
	handleDoneChange() {
		const done = React.findDOMNode(this.refs.checkDone).checked;
		if (this.props.onUpdateTask) {
			this.props.onUpdateTask(this.props.task.set('done', done));
		}
	}

	@autobind
	handleDeleteClick() {
		if (this.props.onDeleteTask) {
			this.props.onDeleteTask(this.props.task.get('uri'));
		}
	}

	render() {
		return  (
			<div>
				<button onClick={this.handleDeleteClick}>X</button>
				<input
					type="checkbox"
					ref='checkDone'
					checked={this.props.task.get('done')}
					onChange={this.handleDoneChange} />
				{this.props.task.get('text')}
			</div>
		);
	}
}

