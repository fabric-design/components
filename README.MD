<p align="center">
<img src="./doc/assets/fabric-logo.png"  />
</p>

# Zalando Fabric Components
[![CircleCI](https://circleci.com/gh/wholesale-design-system/components/tree/release.svg?style=svg)](https://circleci.com/gh/wholesale-design-system/components/tree/release)
[![Styleguide](https://img.shields.io/github/issues/wholesale-design-system/components.svg)](https://github.com/wholesale-design-system/components/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/wholesale-design-system/components.svg)]()

## Motivation

At Zalando Retail Operations we are developing a lot of web applications from small to mid-complex. As we are developing them in different cross-functional teams we wanted to guarantee the same look and feel in all of our applications independent from people and their development background. For guaranteeing same UI across applications and development teams we are developing a component-based Styleguide which provides a SCSS library and (P)React based components which can be all used independently. 

In this repository we are developing the components which can be used later in your application. 

## How it works

Basically the components in this repository are one part of the styleguide. We are not providing or installing any framework (react or preact) or [styles](https://github.com/wholesale-design-system/scss), therefore if you want to use the components you have to provide the framework and styles in your project environment yourself.

We have abstracted our imports from specific frameworks as we think developers should have the opportunity to decide which framework they want to use and especially in our domain every Wholesale application has to use the styles per default.

## Getting started (How to integrate)

The package is not yet published on npm as we are still working in a beta phase. 

First of all you should install react / preact (if not already done) and our scss rules:

- `npm i -D -E preact prop-types` or `npm i -D -E react react-dom prop-types`
- `npm i -D -E git+https://github.com/wholesale-design-system/scss.git`
- Follow [How to integrate component into your build system
](https://github.com/wholesale-design-system/components/wiki/How-to-integrate-component-into-your-build-system) instructions for integrate the components into your build process.
- Alternatively you can find a simple vanillaJS setup [here](/demo/demo_app.js)

## Running Demo Page

During the current development phase we are providing a basic demo page within the project which runs locally at [http://localhost:8080](http://localhost:8080) :

- Execute `npm run start` to start a demo web page  which integrates all components with the react framework.
- Execute `npm run start:preact` to start a demo web page which integrates all components with the preact framework.

In 'demo/index.html' you will a vanillajs solution how to integrate components into a react tech stack.

## Contributing

Our Zalando Fabric Styleguide is in active development and we welcome any contributions and feedback. See our [Contributing](CONTRIBUTING.MD) for detailed information on how to contribute.

## Internal API Documentation

For better onboarding of interested contributers we are providing a auto-generated documentation of our components [API Documentation](docs/api/index.md). For the development and testing of our components we are using gulp, webpack, karma and jasmine. 

## Development Tasks (npm scripts)

- `npm run lint` for linting the source code of our components and tests
- `npm run test` runs both test scenarios (react and preact)
  - `npm run test:preact` for running component tests only with the preact framework
  - `npm run test:react` for running component tests only with the react framework
- `npm run tdd` continous test runner for components (uses preact)
- `npm run docs` generates documentation in docs/api based on jsdocs in the components (src-folder)
- `npm run build` builds our components into the dist folder for later integration. We are currently transpiling our components into AMD, CommmonJS, ES2015 and Systemjs modules. 
- `npm run precommit` we are recommending that before you commit / do a pull-request you should execute this command. It runs the linter, tests and builds everything.
- `npm run start` starts our demo application with webpack dev server at http://localhost:8080. Provides the scss library and react framework.
  - `npm run start:preact` starts our demo application with webpack dev server at http://localhost:8080. Provides the scss library and preact framework.

## Contact

For any further contact feel free to reach out one of us [here](MAINTAINERS). We are all friendly and will be more then happy to answer any question regarding our styleguide.