#!/usr/bin/env node

import { readFileSync } from 'fs';
import { Command } from 'commander';
import { join } from 'path';

const gcommands = new Command('gcommands');

const version = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8')).version;

gcommands.version(version);

gcommands
    .command('new')
    .description('Create a new GCommands project')
    .argument('<type>', 'type', 'base')
    .argument('[name]', 'project name');

gcommands.parse(process.argv);