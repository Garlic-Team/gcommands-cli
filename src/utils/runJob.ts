import ora from 'ora';

export default (job: () => Promise<any>, message) => {
	return new Promise((resolve, reject) => {
		const spinner = ora(message).start();

		return job()
			.then(() => {
				spinner.succeed();
				resolve(true);
			})
			.catch((e) => {
				spinner.fail(e);
				reject(e);
			});
	});
};