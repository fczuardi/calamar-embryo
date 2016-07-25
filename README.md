# calamar-embryo

## Node.js with batteries included

### About
This is a scafolding tool for starting up new calamar projects.

The idea is to save time when starting new projects by setting up the most
common devDependencies for moder nodejs projects.

#### Warning
This tools is on its still under heavy development, alpha-quality software,
expects things to break. Use at your own risk.

## What's included

- [Calamar coding styles][eslint-config-calamar]
- [ES6 modules][transform-es2015-modules-commonjs]

## What's not included

- Babel cli (expected to be installed globally)

See ```templates/default/package.json```

---

## Usage

### 1. Install it globaly
```sh
npm i -g calamar-embryo@latest
```

### 2. Create new project
```sh
embryo new my-project-name
cd my-project-name
npm start
```

[eslint-config-calamar]: https://github.com/calamar-io/eslint-config-calamar
[transform-es2015-modules-commonjs]: https://babeljs.io/docs/plugins/transform-es2015-modules-commonjs/
