require("babel/polyfill");

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TasksView from './components/TasksView';

class App extends React.Component {
	render() {
		return  (
			<div>
				<TasksView />
			</div>
		);
	}
}

React.render((
	<Provider store={store}>
		{() => <App />}
	</Provider>
), document.getElementById('main'));

