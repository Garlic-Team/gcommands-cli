import { initPrompt } from '../prompts/initPrompt';
import { writeFile } from 'fs/promises';
import runJob from '../utils/runJob';
import { existsSync } from 'fs';
import prompts from 'prompts';
import chalk from 'chalk';

export default async() => {
	if (existsSync('./.gcommandsrc.json')) return console.log(chalk.red('You already have gcommands config! You can use gcommands generate'));

	const response = await prompts(initPrompt());
	if (!response['project-language']) return process.exit(1);

	const jobs: [() => any, string][] = [
		[() => generateConfig(response), 'Generating config']
	];

	for (const [job, message] of jobs) {
		await runJob(job, message).catch(() => process.exit(1));
	}
};

export const generateConfig = (response) => {
	return new Promise(async(resolve, reject) => {  
		const data = {
			'project-language': response['project-language'],
			dirs: {
				base: response.base,
				plugins: response.plugins,
				commands: response.commands,
				listeners: response.listeners,
				inhibitors: response.inhibitors
			}
		};
        
		writeFile('./.gcommandsrc.json', JSON.stringify(data, null, 2))
			.catch(e => reject(e))
			.then(() => resolve(true));
	});
};