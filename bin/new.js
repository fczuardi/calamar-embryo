#!/usr/bin/env node

import { join as pathJoin, basename } from 'path';
import { spawn } from 'child_process';
import {
    mkdir, ShellString as shellString, test as shTest,
    cp, cd, echo, cat, sed
} from 'shelljs';

const libName = 'calamar-embryo';

export default ({
    projectDir,
    templateDir,
    noDev
    }
) => {
    const libPathParent = module.paths.find(dir => shTest('-d', pathJoin(dir, libName)));
    const templatesPath = pathJoin(libPathParent, libName, 'templates', templateDir);
    console.log('templatesPath', templatesPath);
    const srcPath = pathJoin(projectDir, 'src');

    // create the project dir
    mkdir('-p', projectDir);

    // create .gitignore containing node_modules
    shellString('node_modules\n').to(pathJoin(projectDir, '.gitignore'));

    // empty package.json file with the dependencies and config
    // for using es2015 modules and the calamar eslint code style
    cp(pathJoin(templatesPath, 'package.json'), pathJoin(projectDir, '.'));
    sed('-i', 'PROJECT_NAME', basename(projectDir), pathJoin(projectDir, 'package.json'));

    // create src path and index.js file
    mkdir('-p', srcPath);
    cp(pathJoin(templatesPath, 'index.js'), pathJoin(srcPath, '.'));

    cd(projectDir);

    // git init
    const gitInit = spawn('git', ['init'], { stdio: 'inherit' }, () => null);
    gitInit.on('close', () => {
        // npm init
        const npmInit = spawn('npm', ['init'], { stdio: 'inherit' }, () => null);
        npmInit.on('close', () => {
            echo('Please wait a moment…');
            // set dependencies version on package.json (and install them)
            const npmArgs = noDev ? ['update', '--production'] : ['update', '--save-dev'];
            const child = spawn('npm', npmArgs, { stdio: 'inherit' }, () => null);
            child.on('close', () => {
                echo(cat('./package.json'));
            });
        });
    });
};
