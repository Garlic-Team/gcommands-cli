import { generatePrompt } from '../prompts/generatePrompt';
import { getFolder } from '../utils/getFolder';
import runJob from '../utils/runJob';
import { hyttpo } from 'hyttpo';
import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs';

export default async() => {
	if (!fs.existsSync('./.gcommandsrc.json')) return console.log(chalk.red('You don\'t have gcommands config! Please use gcommands init'));

	const config = JSON.parse(fs.readFileSync('./.gcommandsrc.json', 'utf-8'));

	const response = await prompts(generatePrompt(config));

	if (!response['component-name'] || !response['component-template']) return process.exit(1);

	const jobs: [() => any, string][] = [
		[() => downloadCommandJob(config, response), `Downloading the ${response['component-template'].type}`]
	];

	for (const [job, message] of jobs) {
		await runJob(job, message).catch(() => process.exit(1));
	}
};

export const downloadCommandJob = (config, response) => {
	return new Promise(async(resolve) => {
		const type = response['component-template'].type;
		const folder = getFolder(config, type);
		let content = (await hyttpo.get(response['component-template'].url)).data;

		if (type === 'command') {
			content = content
				.replace('{name}', response['component-name'])
				.replace('{description}', response['command-description'])
				.replace('{type}', `[ ${response['command-types']} ]`);
		} else if (type === 'listener') {
			content = content
				.replace('{name}', response['component-name'])
				.replace('{event}', response['listener-event'].name)
				.replace('{parameters}', response['listener-event'].parameters.join(', '));
		}

		fs.writeFileSync(`./${config.dirs.base}/${folder}/${response['component-name']}.${config['project-language']}`, content);

		resolve(true);
	});
};