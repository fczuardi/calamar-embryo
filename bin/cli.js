#!/usr/bin/env node

import parseArgs from 'minimist';
import createApp from './new';

const minimistOptions = {
    alias: {
        dir: 'd',
        template: 't',
        noDev: ['nodev', 'n']
    }
};
const argv = parseArgs(process.argv.slice(2), minimistOptions);

const cmdName = argv._[0];
const projectDir = argv.dir || argv._[1];
const templateDir = argv.template || 'default';
const noDev = argv.noDev;

if (!cmdName) {
    console.error('help TBD');
    process.exit(1);
}

if (!projectDir) {
    console.error('Project dir is required.');
    process.exit(1);
}

createApp({
    projectDir,
    templateDir,
    noDev
});
