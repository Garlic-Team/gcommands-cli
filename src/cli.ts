#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { Command } from 'commander';
import { URL } from 'url';

import newCommand from './commands/newCommand';
import initCommand from './commands/initCommand';
import generateCommand from './commands/generateCommand';
import removeCommand from './commands/discord-api-manager/removeCommand';

const gcommands = new Command('gcommands');

const packajeJson = new URL('../package.json', import.meta.url);
const version = JSON.parse(await readFile(packajeJson, 'utf-8')).version;

gcommands.version(version);

gcommands
	.command('new')
	.description('Create a new GCommands project')
	.action(newCommand);

gcommands
	.command('generate')
	.description('Generate a component for your project')
	.action(generateCommand);

gcommands
	.command('init')
	.description('Init your project as GCommands project')
	.action(initCommand);

gcommands
	.command('application')
	.description('Manage application commands (Discord API)')
	.command('remove')
	.description('Remove slash command (Discord API)')
	.action(removeCommand);

gcommands.parse(process.argv);