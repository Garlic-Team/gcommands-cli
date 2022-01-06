import { JavaScriptTemplates, TypeScriptTemplates } from '../utils/templates';
import type { PromptObject } from 'prompts';
import fs from 'fs';

export const newPrompt = (): Array<PromptObject> => {
	return [
		{
			type: 'text',
			name: 'project-name',
			message: 'What\'s the name of your project?',
			validate: (value) => {
				const regexp = /^[a-z0-9]+$/i.test(value);
				const exists = fs.existsSync(`./${value}`);

				if (!regexp) return 'Only `/^[a-z0-9]+$/i` characters are allowed';
				if (exists) return 'Project with this name already exists';

				return true;
			}
		},
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
			type: 'select',
			name: 'project-template',
			message: 'Select a template for your project',
			choices: (prev: string) => (prev === 'js' ? JavaScriptTemplates : TypeScriptTemplates)
		}
	];
};