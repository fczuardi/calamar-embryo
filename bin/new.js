#!/usr/bin/env node

import { join as pathJoin } from 'path';
import {
    mkdir, ShellString as shellString, test as shTest, cp, cd, exec as shExec, echo, cat
} from 'shelljs';

const projectName = 'calamar-embryo';

export default projectDir => {
    // create the project dir
    mkdir('-p', projectDir);

    // create .gitignore containing node_modules
    shellString('node_modules\n').to(pathJoin(projectDir, '.gitignore'));

    // empty package.json file with the dependencies and config
    // for using es2015 modules and the calamar eslint code style
    const templatesPathPrefix = module.paths.find(
        dir => shTest('-d', pathJoin(dir, projectName))
    );
    cp(
        pathJoin(templatesPathPrefix, projectName, 'templates', 'package.json'),
        pathJoin(projectDir, '.')
    );
    cd(projectDir);
    echo('Please wait a moment…');
    const gitInit = shExec('git init', {}, () => null);
    gitInit.on('close', () => {
        echo('Git repo initialized');
    });
    const child = shExec('npm update --save-dev', {}, () => null);
    child.on('close', () => {
        echo(cat('./package.json'));
    });
    return child;
};
