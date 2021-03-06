const del = require( 'del' )
const sequence= require( 'run-sequence' )
const gulp = require( 'gulp' )
const sourcemaps = require( 'gulp-sourcemaps' )
const postcss = require( 'gulp-postcss' )
const requireNew = require( 'require-new' )

gulp.task( 'html', () =>
    gulp.src( './demo/demo.html' )
        .pipe( gulp.dest( './build' ) )
)

gulp.task( 'styles', () => {
    let rtl = requireNew( './src/index' )
    let options = {
        prefixType: 'attribute'
    }
    return gulp.src( './demo/*.css' )
        .pipe( sourcemaps.init() )
        .pipe( postcss( [ rtl( options ) ] ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( './build' ) )
} )


gulp.task( 'clean', () =>
    del( './build/*.css' )
)

gulp.task( 'styles:rebuild', sequence( 'clean', 'styles' ) )

gulp.task( 'watch', ()=>
    gulp.watch( [
        './demo/*.css',
        './src/*.js'
    ], [ 'styles:rebuild' ] )
)

gulp.task( 'dev', [ 'default', 'watch' ] )
gulp.task( 'default', [ 'styles', 'html' ] )
