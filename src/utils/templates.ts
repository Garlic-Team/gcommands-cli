import type { Choice } from 'prompts';

export const JavaScriptTemplates: Choice[] = [
	{
		title: 'Bot template',
		description: 'GCommands bot template in JavaScript',
		value: {
			repository: 'Garlic-Team/gcommands-templates',
			branch: 'js'
		}
	}
];

export const TypeScriptTemplates: Choice[] = [
	{
		title: 'Bot template',
		description: 'GCommands bot template in TypeScript',
		value: {
			repository: 'Garlic-Team/gcommands-templates',
			branch: 'ts'
		}
	}
];

export const TypeScriptGenerateTemplates: Choice[] = [
	{
		title: 'Command template',
		description: 'GCommands command template in TypeScript',
		value: {
			type: 'command',
			language: 'typescript',
			url: 'https://garlic-team.github.io/gcommands-templates/typescript/command.template'
		}
	},
	{
		title: 'Listener template',
		description: 'GCommands listener template in TypeScript',
		value: {
			type: 'listener',
			language: 'typescript',
			url: 'https://garlic-team.github.io/gcommands-templates/typescript/listener.template'
		}
	},
	{
		title: 'Inhibitor template',
		description: 'GCommands inhibitor template in TypeScript',
		value: {
			type: 'inhibitor',
			language: 'typescript',
			url: 'https://garlic-team.github.io/gcommands-templates/typescript/inhibitor.template'
		}
	},
	{
		title: 'Provider template',
		description: 'GCommands provider template in TypeScript',
		value: {
			type: 'provider',
			language: 'typescript',
			url: 'https://garlic-team.github.io/gcommands-templates/typescript/provider.template'
		}
	}
];

export const JavaScriptGenerateTemplates: Choice[] = [
	{
		title: 'Command template',
		description: 'GCommands command template in JavaScript',
		value: {
			type: 'command',
			language: 'javascript',
			url: 'https://garlic-team.github.io/gcommands-templates/javascript/command.template'
		}
	},
	{
		title: 'Listener template',
		description: 'GCommands listener template in JavaScript',
		value: {
			type: 'listener',
			language: 'javascript',
			url: 'https://garlic-team.github.io/gcommands-templates/javascript/listener.template'
		}
	},
	{
		title: 'Inhibitor template',
		description: 'GCommands inhibitor template in JavaScript',
		value: {
			type: 'inhibitor',
			language: 'javascript',
			url: 'https://garlic-team.github.io/gcommands-templates/javascript/inhibitor.template'
		}
	},
	{
		title: 'Provider template',
		description: 'GCommands provider template in JavaScript',
		value: {
			type: 'provider',
			language: 'javascript',
			url: 'https://garlic-team.github.io/gcommands-templates/javascript/provider.template'
		}
	}
];