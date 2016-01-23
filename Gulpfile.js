var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var minicss			= require('gulp-cssnano');
var minijs			= require('gulp-uglify');
var browserify 		= require('browserify');
var source 			= require('vinyl-source-stream');
var buffer			= require('vinyl-buffer');

// This task compiles sass into css.
gulp.task('dev-sass', () =>{
	return gulp.src('./src/css/main.scss')
		.pipe(sass('main.css'))
		.pipe(gulp.dest('./dist/css'));
});

// This task bundles our scripts using browserify.
gulp.task('dev-scripts', () =>{
	return browserify('./src/js/app.js')
		.bundle()
		.pipe(source('orion.js'))
		.pipe(gulp.dest('./dist/js'));
});

// This task compiles sass into css, and then minifies it.
gulp.task('pro-sass', () =>{
	return gulp.src('./src/css/main.scss')
		.pipe(sass('main.css'))
		.pipe(minicss())
		.pipe(gulp.dest('./dist/css'));
});

// This task bundles our scripts using browserify, and then minifies it.
gulp.task('pro-scripts', () =>{
	return browserify('./src/js/app.js')
		.bundle()
		.pipe(source('orion.js'))
		.pipe(buffer())
		.pipe(minijs())
		.pipe(gulp.dest('./dist/js'));
});


// This is the task we will run while developing our application.
// It will enable continuous development.
gulp.task('development', ()=>{
	gulp.watch('./src/css/**/*.scss', ['dev-sass']);
	gulp.watch('./src/js/**/*.js', ['dev-scripts']);
});

// This is the task we will run when we're ready to put our app into production.
// It will include a few optimiztions.
gulp.task('production', ['pro-sass', 'pro-scripts'])

