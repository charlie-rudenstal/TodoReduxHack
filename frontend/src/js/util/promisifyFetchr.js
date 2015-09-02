import Promise from 'bluebird';

export default function promisifyFetchr(fetchrOperation) {
	return new Promise((resolve, reject) => {
		fetchrOperation.end((err, data, meta) => {
			if (err) {
				return reject(err);
			}
			resolve(data);
		});
	});
}
