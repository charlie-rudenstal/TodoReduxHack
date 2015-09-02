import cond from '../util/cond';

export default function(state = [], action) {
	return cond(action.type, {
		LOAD_TASKS: () => action.tasks,
		CREATE_TASK: () => [
			{ title: 'my task' },
			...state,
		],
		default: () => [],
	});
};
