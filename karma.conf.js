// Karma configuration
// Generated on Wed Apr 19 2017 14:10:58 GMT+0200 (CEST)

module.exports = config => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'tests/**/*.js',
      'tests/index.scss'
    ],


    // list of files to exclude
    exclude: [
      'tests/utils/*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.js': ['webpack', 'sourcemap'],
      'tests/**/*.js': ['webpack', 'sourcemap'],
      'tests/index.scss': ['webpack', 'sourcemap']
    },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-mocha-reporter'
    ],
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // when chrome 59 is released we can add --headless flag to it (future)
    // Create chrome launcher without andbox because docker has none
    customLaunchers: {
      Chrome_without_sandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox'] // with sandbox it fails under Docker
      }
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome_without_sandbox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpack: require('./webpack.config.preact.test.js') // eslint-disable-line global-require
  });
};
