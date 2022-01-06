import type { PromptObject } from 'prompts';

export const initPrompt = (): Array<PromptObject> => {
	return [
		{
			type: 'select',
			name: 'project-language',
			message: 'Select a language for your project',
			choices: [
				{
					title: 'TypeScript',
					value: 'ts'
				},
				{
					title: 'JavaScript',
					value: 'js'
				}
			]
		},
		{
			type: 'text',
			name: 'base',
			message: 'What\'s the name of your base directory? | Leave empty if you don\'t have',
			validate: (value) => {
				if (!value || value.length === 0) return true;

				const regexp = /^[a-z0-9]+$/i.test(value);
				if (!regexp) return 'Only `/^[a-z0-9]+$/i` characters are allowed';

				return true;
			}
		},
		{
			type: 'text',
			name: 'commands',
			message: 'What\'s the name of your commands directory? | Leave empty if you don\'t have',
			validate: (value) => {
				if (!value || value.length === 0) return true;

				const regexp = /^[a-z0-9]+$/i.test(value);
				if (!regexp) return 'Only `/^[a-z0-9]+$/i` characters are allowed';

				return true;
			}
		},
		{
			type: 'text',
			name: 'listeners',
			message: 'What\'s the name of your listeners directory? | Leave empty if you don\'t have',
			validate: (value) => {
				if (!value || value.length === 0) return true;

				const regexp = /^[a-z0-9]+$/i.test(value);
				if (!regexp) return 'Only `/^[a-z0-9]+$/i` characters are allowed';

				return true;
			}
		},
		{
			type: 'text',
			name: 'inhibitors',
			message: 'What\'s the name of your inhibitors directory? | Leave empty if you don\'t have',
			validate: (value) => {
				if (!value || value.length === 0) return true;

				const regexp = /^[a-z0-9]+$/i.test(value);
				if (!regexp) return 'Only `/^[a-z0-9]+$/i` characters are allowed';

				return true;
			}
		},
		{
			type: 'text',
			name: 'plugins',
			message: 'What\'s the name of your plugins directory? | Leave empty if you don\'t have',
			validate: (value) => {
				if (!value || value.length === 0) return true;

				const regexp = /^[a-z0-9]+$/i.test(value);
				if (!regexp) return 'Only `/^[a-z0-9]+$/i` characters are allowed';

				return true;
			}
		},
	];
};