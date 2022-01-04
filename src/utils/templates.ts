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
]

export const TypeScriptTemplates: Choice[] = [
    {
        title: 'Bot template',
        description: 'GCommands bot template in TypeScript',
        value: {
            repository: 'Garlic-Team/gcommands-templates',
            branch: 'ts'
        }
    }
]