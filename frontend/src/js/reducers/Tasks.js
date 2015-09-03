import cond from '../util/cond';
import _ from 'lodash';
import Immutable from 'immutable';

export default function(state = Immutable.Map(), action) {
	return cond(action.type, {

		LOAD_TASKS_PENDING: () => state, // todo: loading indicator
		LOAD_TASKS_SUCCESS: () => action.payload,
		LOAD_TASKS_FAIL: () => state,

		CREATE_TASK_PENDING: () => state, // todo: optimistic insert
		CREATE_TASK_SUCCESS: () => state.set(action.payload.get('uri'), action.payload),
		CREATE_TASK_FAIL: () => state, // todo: error message

		UPDATE_TASK_PENDING: () => state.set(action.payload.get('uri'), action.payload),
		UPDATE_TASK_SUCCESS: () => state.set(action.payload.get('uri'), action.payload),
		UPDATE_TASK_FAIL: () => state, // todo: error message

		default: () => state,
	});
};
