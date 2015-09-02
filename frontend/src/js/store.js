import { combineReducers, createStore } from 'redux';
import tasks from './reducers/tasks';

const reducers = combineReducers({
	tasks,
});

export default createStore(reducers);
