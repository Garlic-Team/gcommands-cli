import type { PromptObject } from 'prompts';

export const removePrompt = (): Array<PromptObject> => {
	return [
		{
			type: 'password',
			name: 'token',
			message: 'You must provide a token to fetch commands.'
		},
		{
			type: 'select',
			name: 'select',
			message: 'Select whether the command you want to delete is a global or a guild command.',
			choices: [
				{
					title: 'Global Command',
					value: 'global'
				},
				{
					title: 'Guild Command',
					value: 'guild'
				}
			]
		},
		{
			type: (prev) => prev === 'guild' ? 'text' : null,
			name: 'guildId',
			message: 'What\'s the id of your guild?'
		}
	];
};

export const selectCommand = (commands): Array<PromptObject> => {
	return [
		{
			type: 'multiselect',
			name: 'commands',
			message: 'Select the command you want to delete.',
			choices: commands.map(c => new Object({
				title: c.name,
				value: c.id,
				description: c.description
			}))
		}
	];
};