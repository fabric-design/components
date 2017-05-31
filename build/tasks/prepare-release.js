const gulp = require('gulp');
const runSequence = require('run-sequence');
const paths = require('../paths');
const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGitHubReleaser = require('conventional-github-releaser');
const bump = require('gulp-bump');
const args = require('../args');
const changelogOpts = {
  preset: 'angular',
  releaseCount: 1
};

// utilizes the bump plugin to bump the
// semver for the repo
gulp.task('bump-version', () =>
  gulp.src(['./package.json'])
    .pipe(bump({type: args.bump}))
    .pipe(gulp.dest('./'))
);

// generates the CHANGELOG.md file based on commit
// from git commit messages
gulp.task('changelog', () =>
  gulp.src(`${paths.doc}/CHANGELOG.md`)
    .pipe(conventionalChangelog(changelogOpts))
    .pipe(gulp.dest(paths.doc))
);

// calls the listed sequence of tasks in order
gulp.task('prepare-release', callback =>
  runSequence(
    'build',
    'lint',
    'bump-version',
    'changelog',
    callback
  )
);

gulp.task('release', callback => {
  conventionalGitHubReleaser({
    type: 'oauth',
    token: args.token || process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
  }, changelogOpts, {}, {}, {}, {}, (err, data) => {
    if (err) {
      console.error(err.toString());
      return callback();
    }

    if (!data.length) {
      console.log('No GitHub releases created because no git tags available to work with.');
      return callback();
    }

    let allRejected = true;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].state === 'fulfilled') {
        allRejected = false;
        break;
      }
    }

    if (allRejected) {
      console.error(data);
    } else {
      console.log(data);
    }
    return callback();
  });
});
