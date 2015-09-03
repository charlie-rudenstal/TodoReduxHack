import Fetcher from 'fetchr';
import promisify from '../util/promisifyFetchr';
import _ from 'lodash';
import Immutable from 'immutable'
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
				promise: promisify(fetcher.read('taskService'))
					.then((payload) => _.indexBy(payload.tasks, 'uri'))
					.then(Immutable.fromJS)
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
				).then(Immutable.fromJS),
				data: task,
			}
		};
	},

	updateTask(task) {
		return {
			types: [
				'UPDATE_TASK_PENDING',
				'UPDATE_TASK_SUCCESS',
				'UPDATE_TASK_FAIL',
			],
			payload: {
				promise: promisify(fetcher
					.update('taskService')
					.params(task.toJS())
				).then(Immutable.fromJS),
				data: task,
			}
		}
	}
}
