var gulp = require('gulp');
var sass = require('gulp-sass');
var auto = require('gulp-autoprefixer');
var rename = require('gulp-rename');
// const concat = require('gulp-concat'); // 合并多个css .concat('index.css')

gulp.task('designer', function (done) {
  gulp.src('./designer/designer.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })).on('error', sass.logError)
    .pipe(auto({
      cascade: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('../css/'));
  done();
})

gulp.task('controls', function (done) {
  gulp.src('./controls/smart-ui.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })).on('error', sass.logError)
    .pipe(auto({
      cascade: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('../css/'))
    .pipe(gulp.dest('../../../../AppPrev/AppPreview/wwwroot/css'))
    .pipe(gulp.dest('../../../../AppPub/AppPublish/wwwroot/css'))
  done();
})

gulp.task('theme', function (done) {
  gulp.src('./theme/output/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })).on('error', sass.logError)
    .pipe(auto({
      cascade: false
    }))
    .pipe(rename({
      suffix: ''
    }))
    .pipe(gulp.dest('../themes/'))
    .pipe(gulp.dest('../../../../AppPrev/AppPreview/wwwroot/themes'))
    .pipe(gulp.dest('../../../../AppPub/AppPublish/wwwroot/themes'))
  done();
})