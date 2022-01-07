import { removePrompt, selectCommand } from '../../prompts/discord-api-manager/removePrompt';
import { hyttpo } from 'hyttpo';
import runJob from '../../utils/runJob';
import chalk from 'chalk';
import prompts from 'prompts';

export default async() => {
	const response = await prompts(removePrompt());
	if (!response['token']) return process.exit(1);

	const clientId = Buffer.from(response.token.split('.')[0], 'base64').toString();

	const commands = await runJob(() => getCommands(clientId, response), 'Getting commands').catch(() => process.exit(1));

	if (!Array.isArray(commands) || commands.length === 0) return console.log(chalk.red(`There are probably no commands, or you have entered some property wrong.`));

	const commandsToDelete = (await prompts(selectCommand(commands))).commands;

	const jobs: [() => any, string][] = [
		[() => deleteCommands(clientId, response, commandsToDelete, commands), 'Generating config']
	];

	for (const [job, message] of jobs) {
		await runJob(job, message).catch(() => process.exit(1));
	}
};

export const deleteCommands = (clientId, response, commandsToDelete, allCommands) => {
	return new Promise(async(resolve, reject) => {
		let url = '';
	
		if (response.select === 'global') url = `https://discord.com/api/v9/applications/${clientId}/commands`;
		else url = `https://discord.com/api/v9/applications/${clientId}/guilds/${response.guildId}/commands`;

		console.log(allCommands.length);

		for await(const command of commandsToDelete) allCommands = allCommands.filter(c => c.id !== command);

		console.log(allCommands.length);
		const res = await hyttpo.request({
			url,
			method: 'PUT',
			headers: {
				'Authorization': `Bot ${response.token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(allCommands)
		}).catch(e => e);

		if (res.ok) resolve(true);
		else reject(res.data)
	})
}

export const getCommands = (clientId, response) => {
	return new Promise(async(resolve, reject) => {
		let url = '';
	
		if (response.select === 'global') url = `https://discord.com/api/v9/applications/${clientId}/commands`;
		else url = `https://discord.com/api/v9/applications/${clientId}/guilds/${response.guildId}/commands`;
	
		const res = await hyttpo.request({
			url,
			method: 'GET',
			headers: {
				'Authorization': `Bot ${response.token}`
			}
		}).catch(e => e);
	
		if (res.ok) resolve(res.data);
		else reject(res.data);
	});
}