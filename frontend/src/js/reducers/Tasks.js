import cond from '../util/cond';

export default function(state = [], action) {
	return cond(action.type, {

		LOAD_TASKS_PENDING: () => state,
		LOAD_TASKS_SUCCESS: () => action.payload.tasks,
		LOAD_TASKS_FAIL: () => state,

		CREATE_TASK_PENDING: () => [ action.payload, ...state ],
		CREATE_TASK_SUCCESS: () => state,
		CREATE_TASK_FAIL: () => state,

		default: () => state,
	});
};
