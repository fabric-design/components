<p align="center">
<img src="./doc/assets/fabric-logo.png"  />
</p>

# Zalando Fabric Components
[![CircleCI](https://circleci.com/gh/fabric-design/components/tree/release.svg?style=svg)](https://circleci.com/gh/fabric-design/components/tree/release)
[![Issues](https://img.shields.io/github/issues/fabric-design/components.svg)](https://github.com/fabric-design/components/issues)
[![Contributors](https://img.shields.io/github/contributors/fabric-design/components.svg)]()
[![GitHub release](https://img.shields.io/github/release/fabric-design/components.svg)](doc/CHANGELOG.md)
## Motivation

At Zalando Retail Operations we develop a lot of web applications of different size and complexity. We want to ensure consistent look and feel in every one of them, regardless which individual team worked on it. For this purpose we created a [styleguide](https://github.com/fabric-design/styleguide) that provides a [SCSS style library](https://github.com/fabric-design/scss) and a set of independent React/Preact components.

This repository is a home to the aforementioned components.

## How it works

Components in this repository are one part of the styleguide. We don't install any framework or [styles](https://github.com/fabric-design/scss), therefore if you want to use the components you have to provide the framework (React or Preact) and styles in your project yourself.

For development and testing we use gulp, webpack, karma and jasmine.

## Integrating Components into Your Project

The package is not yet published on npm as we are still in the beta phase.

First of all you should install React/Preact (if haven't already) and our scss rules:
- `npm i -D -E preact prop-types` or `npm i -D -E react react-dom prop-types`
- `npm i -D -E git+https://github.com/fabric-design/scss.git`
- Follow [instructions](https://github.com/fabric-design/components/wiki/How-to-integrate-component-into-your-build-system) for integrating the components into your build process.
- Alternatively, you can check our example [vanillaJS setup](/demo/demo_app.js).

## Running Demo Page

We provide a demo page that integrates all components and runs locally at [http://localhost:8080](http://localhost:8080):

- `npm run start` starts the demo in React mode
- `npm run start:preact` starts the demo in Preact mode.

Check the 'demo' folder for the example of how to integrate components into a React tech stack.

## Contributing

The styleguide is in active development and we welcome any contributions and feedback. See our [contributing guidelines](CONTRIBUTING.MD) for detailed information.

## Internal API Documentation

To help with onboarding of potential contributors we provide auto-generated documentation of components [API Documentation](docs/api/index.md).

## Development Tasks (npm scripts)

- `npm run lint` for linting the source code of our components and tests
- `npm run test` runs both test scenarios (react and preact)
  - `npm run test:preact` for running component tests only with the preact framework
  - `npm run test:react` for running component tests only with the react framework
- `npm run tdd` continuous test runner for components (uses preact)
- `npm run docs` generates documentation in docs/api based on jsdocs in the components (src-folder)
- `npm run build` builds our components into the dist folder for later integration. We are currently transpiling our components into AMD, CommmonJS, ES2015 and Systemjs modules.
- `npm run precommit` we recommend that before you commit / do a pull-request you should execute this command. It runs the linter, tests and builds everything.
- `npm run start` starts our demo application with webpack dev server at http://localhost:8080. Provides the scss library and react framework.
  - `npm run start:preact` starts our demo application with webpack dev server at http://localhost:8080. Provides the scss library and preact framework.

## Contact

Feel free to reach out any of us [here](MAINTAINERS). We are all friendly and will be more then happy to answer any question regarding our styleguide.
