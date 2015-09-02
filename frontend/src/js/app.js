require("babel/polyfill");

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
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

React.render((
	<Provider store={store}>
		{() => <App />}
	</Provider>
), document.getElementById('main'));

