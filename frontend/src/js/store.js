import { combineReducers, createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import tasks from './reducers/tasks';
import Immutable from 'immutable';

const reducers = combineReducers({
	tasks,
});

const loggerMiddleware = createLogger({
	// transform immutable objects into JSON
	// (https://github.com/fcomb/redux-logger)
	transformer: (state) => {
		for (var i of Object.keys(state)) {
			if (Immutable.Iterable.isIterable(state[i])) {
				return state[i].toJS();
			} else {
				return state[i];
			}
		}
	}
});

export default applyMiddleware(
	promiseMiddleware,
	loggerMiddleware)
	(createStore)(reducers);
