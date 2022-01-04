#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { Command } from 'commander';
import { URL } from 'url';

import newCommand from './commands/newCommand';

const gcommands = new Command('gcommands');

const packajeJson = new URL('../package.json', import.meta.url);
const version = JSON.parse(await readFile(packajeJson, 'utf-8')).version;

gcommands.version(version);

gcommands
    .command('new')
    .description('Create a new GCommands project')
    .action(newCommand);

gcommands.parse(process.argv);