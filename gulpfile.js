const {src,dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

function js(){
    return src("./js/index.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest('./js'));
}

function css(){
    return src("./sass/**/*.scss") 
        .pipe(sass()) 
        .pipe(cleanCSS()) 
        .pipe(rename('main.min.css'))
        .pipe(dest("./css")); 
} 
 
exports.css = css;
exports.js = js;
exports.default = () => {};
