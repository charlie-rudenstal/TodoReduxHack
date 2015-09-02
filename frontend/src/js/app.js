import React from 'react';
import TaskListContainer from './components/TaskListContainer';

class App extends React.Component {

	render() {
		return  (
			<div>
				<TaskListContainer />
			</div>
		);
	}
}

React.render(<App />, document.getElementById('main'));

