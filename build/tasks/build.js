const gulp = require('gulp');
const runSequence = require('run-sequence');
const to5 = require('gulp-babel');
const paths = require('../paths');
const compilerOptions = require('../babel-options');
const assign = Object.assign || require('object.assign');
const fs = require('fs-then-native');
const glob = require('glob');
const jsdoc2md = require('jsdoc-to-markdown');
const rimraf = require('rimraf');

gulp.task('build-html', () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest(`${paths.output  }es2015`))
    .pipe(gulp.dest(`${paths.output  }commonjs`))
    .pipe(gulp.dest(`${paths.output  }amd`))
    .pipe(gulp.dest(`${paths.output  }system`));
});

gulp.task('build-css', () => {
  return gulp.src(paths.css)
    .pipe(gulp.dest(`${paths.output  }es2015`))
    .pipe(gulp.dest(`${paths.output  }commonjs`))
    .pipe(gulp.dest(`${paths.output  }amd`))
    .pipe(gulp.dest(`${paths.output  }system`));
});

gulp.task('build-es2015', () => {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.es2015())))
    .pipe(gulp.dest(`${paths.output  }es2015`));
});

gulp.task('build-commonjs', () => {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.commonjs())))
    .pipe(gulp.dest(`${paths.output  }commonjs`));
});

gulp.task('build-amd', () => {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.amd())))
    .pipe(gulp.dest(`${paths.output  }amd`));
});

gulp.task('build-system', () => {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.system())))
    .pipe(gulp.dest(`${paths.output  }system`));
});

gulp.task('build-es2015-for-docs', () => {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.docs())))
    .pipe(gulp.dest(`${paths.output}/docs/es2015`));
});

gulp.task('build-api-docs', () => {
  const files = glob.sync(`${paths.output}/docs/es2015/**/**/*.js`); // glob allows pattern matching for filenames
  const createdMdDocs = files.map(filename => {
    return {
      file: filename.match(/((\w)+(\-)*(\w))+(?=.js)/g)[0],
      markdown: jsdoc2md.renderSync({files: filename})
    };
  });
  const writeMdFiles = createdMdDocs.map(mdDoc => fs.writeFile(`${paths.output}/docs/${mdDoc.file}.md`, mdDoc.markdown));
  return Promise.all(writeMdFiles);
});

gulp.task('delete-es2015-for-docs', () => {
  return new Promise(
    (resolve, reject) => {
      rimraf(`${paths.output}/docs/es2015`, err => {
        if (err) reject(err);
        resolve();
      });
    });
});

gulp.task('generate-docs', done => runSequence('clean', 'build-es2015-for-docs', 'build-api-docs', 'delete-es2015-for-docs', done));

gulp.task('build', callback => {
  return runSequence(
    'clean',
    ['build-html', 'build-css', 'build-es2015', 'build-commonjs', 'build-amd', 'build-system', 'generate-docs'],
    callback
  );
});
