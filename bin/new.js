#!/usr/bin/env node

import { join as pathJoin } from 'path';
import {
    mkdir, ShellString as shellString, test as shTest, cp, cd, exec as shExec, echo, cat
} from 'shelljs';

export default projectDir => {
    // create the project dir
    mkdir('-p', projectDir);

    // create .gitignore containing node_modules
    shellString('node_modules\n').to(pathJoin(projectDir, '.gitignore'));

    // empty package.json file with the dependencies and config
    // for using es2015 modules and the calamar eslint code style
    // const modulePath = './node_modules/calamar-embryo';
    // const templatesPathPrefix = shTest('-d', modulePath) ? modulePath : '.';
    const templatesPathPrefix = module.paths.find(
        dir => shTest('-d', pathJoin(dir, 'calamar-embryo'))
    );
    console.log('--templatesPathPrefix--', templatesPathPrefix);
    cp(`${templatesPathPrefix}/templates/package.json`, pathJoin(projectDir, '.'));

    cd(projectDir);
    echo('Please wait a moment…');
    const child = shExec('npm update --save-dev', {}, () => null);
    child.on('close', () => {
        echo(cat('./package.json'));
    });
    return child;
};
