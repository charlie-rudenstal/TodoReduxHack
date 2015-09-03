import { combineReducers, createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import tasks from './reducers/tasks';

const reducers = combineReducers({
	tasks,
});

const loggerMiddleware = createLogger();
export default applyMiddleware(
	promiseMiddleware,
	loggerMiddleware)
	(createStore)(reducers);
