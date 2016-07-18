#!/usr/bin/env node

import { mkdir } from 'shelljs';

export default projectDir => mkdir('-p', projectDir);
