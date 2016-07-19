#!/usr/bin/env node

import { cp } from 'shelljs';

cp('package.json', 'dist/npm/.');
cp('-R', 'templates', 'dist/npm/.');
