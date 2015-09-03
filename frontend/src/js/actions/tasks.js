import Fetcher from 'fetchr';
import promisify from '../util/promisifyFetchr';
let fetcher = new Fetcher({ xhrPath: '/api-proxy' });

export default {
	loadTasks() {
		return {
			types: [
				'LOAD_TASKS_PENDING',
				'LOAD_TASKS_SUCCESS',
				'LOAD_TASKS_FAIL',
			],
			payload: {
				promise: promisify(fetcher.read('taskService')),
			}
		};
	},

	createTask(task) {
		return {
			types: [
				'CREATE_TASK_PENDING',
				'CREATE_TASK_SUCCESS',
				'CREATE_TASK_FAIL',
			],
			payload: {
				promise: promisify(fetcher
					.create('taskService')
					.params(task)
				),
				data: task,
			}
		};
	}
}
