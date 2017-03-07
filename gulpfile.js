// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory
require('./build/tasks/build');
require('./build/tasks/clean');
require('./build/tasks/lint');
require('./build/tasks/prepare-release');
require('./build/tasks/test');
