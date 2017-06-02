const gulp = require('gulp');
const Karma = require('karma').Server;
const runSequence = require('run-sequence');

/**
 * Run test once and exit
 */
gulp.task('test', done => runSequence('test:preact', 'test:react', done));

/**
 * Default is preact
 */
gulp.task('test:preact', function(done) {
  new Karma({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:react', function(done) {
  new Karma({
    configFile: __dirname + '/../../karma.conf.js',
    webpack: require('../../webpack.config.react.test.js'),
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 * Default: preact
 */
gulp.task('tdd', function(done) {
  new Karma({
    configFile: __dirname + '/../../karma.conf.js'
  }, done).start();
});

/**
 * Run test once with code coverage and exit
 */
gulp.task('cover', function(done) {
  new Karma({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true,
    reporters: ['coverage'],
    preprocessors: {
      'test/**/*.js': ['babel'],
      'src/**/*.js': ['babel', 'coverage']
    },
    coverageReporter: {
      includeAllSources: true,
      instrumenters: {
        isparta: require('isparta')
      },
      instrumenter: {
        'src/**/*.js': 'isparta'
      },
      reporters: [
        { type: 'html', dir: 'coverage' },
        { type: 'text' }
      ]
    }
  }, done).start();
});
