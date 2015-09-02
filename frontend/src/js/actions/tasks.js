import Fetcher from 'fetchr';
import promisify from '../util/promisifyFetchr';
let fetcher = new Fetcher({ xhrPath: '/api-proxy' });

export default {
	async loadTasks() {
		let result = await promisify(fetcher.read('taskService'));
		return { type: 'LOAD_TASKS_SUCCESS', tasks: result.tasks };
	},

	createTask() {
		return { type: 'CREATE_TASK' };
	}
}
