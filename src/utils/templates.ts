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

export const TypeScriptGenerateTemplates: Choice[] = [
    {
        title: 'Command template',
        description: 'GCommands command template in TypeScript',
        value: 'url'
    }
]

export const JavaScriptGenerateTemplates: Choice[] = [
    {
        title: 'Command template',
        description: 'GCommands command template in JavaScript',
        value: 'url'
    }
]