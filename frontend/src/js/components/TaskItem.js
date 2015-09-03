import React from 'react';
import { autobind } from 'core-decorators';

export default class TaskItem extends React.Component {

	@autobind
	onChangeDone() {
		const done = React.findDOMNode(this.refs.checkDone).checked;
		if (this.props.onUpdateTask) {
			this.props.onUpdateTask(this.props.task.set('done', done));
		}
	}

	render() {
		return  (
			<div>
				<input
					type="checkbox"
					ref='checkDone'
					checked={this.props.task.get('done')}
					onChange={this.onChangeDone} />
				{this.props.task.get('text')}
			</div>
		);
	}
}

