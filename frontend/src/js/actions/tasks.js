export default {

	loadTasks() {
		const tasks = [
			{ title: 'first', done: true },
			{ title: 'second', done: false },
		];
		return { type: 'LOAD_TASKS', tasks };
	},

	createTask() {
		return { type: 'CREATE_TASK' };
	}

}
