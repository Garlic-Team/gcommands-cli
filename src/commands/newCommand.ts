import fs from 'fs/promises';
import mv from 'mv';
import prompts from 'prompts';
import { newPrompt } from '../prompts/newPrompt';
import cloneRepo from '../utils/cloneRepo';
import { fileURLToPath } from 'url';
import runJob from '../utils/runJob';
import { exec } from 'child_process';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async() => {
    const response = await prompts(newPrompt());

    if (!response['project-name'] || !response['project-language'] || !response['project-template']) return process.exit(1);

    const jobs: [() => any, string][] = [
        [() => cloneRepoJob(response), 'Cloning the repository'],
        [() => moveFolderJob(response), 'Moving the folder & Creating config'],
        [() => installDependenciesJob(`./${response['project-name']}`), 'Installing dependencies']
    ]

    for (const [job, message] of jobs) {
        await runJob(job, message).catch(() => process.exit(1));
    }
}

export const cloneRepoJob = (response) => {
    return new Promise(async(resolve, reject) => {
        const cloned = await cloneRepo({
            owner: response['project-template'].repository.split('/')[0],
            repository: response['project-template'].repository.split('/')[1],
            branch: response['project-template'].branch,
            'project-name': response['project-name']
        })

        if (cloned) resolve(cloned);
        else reject(cloned);
    })
}

export const moveFolderJob = (response) => {
    return new Promise((resolve, reject) => {
        const rawPath = `./${response['project-name']}/gcommands-templates-${response['project-template'].branch}`;
        const parsedPath = `./${response['project-name']}`;

        mv(rawPath, parsedPath, { mkdirp: false, clobber: false }, (err) => {
            if (err) reject(err);
            else {
                const data = {
                    'project-language': response['project-language'],
                    dirs: {
                        base: 'src',
                        plugins: 'plugins',
                        commands: 'commands',
                        listeners: 'listeners',
                        inhibitors: 'inhibitors'
                    }
                }
                
                fs.writeFile(`${parsedPath}/.gcommandsrc.json`, JSON.stringify(data, null, 2))
                    .catch(e => reject(e))
                    .then(() => resolve(true));
            }
        });
    });
}

export const installDependenciesJob = (location) => {
    return new Promise((resolve, reject) => {
        exec(`npm i dotenv gcommands@next discord.js@13.5.0`, { cwd: location }, (error) => {
            if (error) reject(error);
            else resolve(error);
        })
    });
}