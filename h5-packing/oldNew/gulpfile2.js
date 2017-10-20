/**
 * Created by pdc on 2016/11/13.
 */
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin'); //html压缩
var uglify = require('gulp-uglify');//js压缩
var notify = require('gulp-notify');//提示信息
var minifycss = require('gulp-minify-css');//压缩css
var imagemin = require('gulp-imagemin');//图片压缩
var pngcrush = require('imagemin-pngcrush');
var concat = require('gulp-concat');//文件合并
var rename = require('gulp-rename');//文件更名
var react = require('gulp-react');
var es2015 = require('babel-preset-es2015');
var babel = require("gulp-babel");
var clean = require("gulp-clean");
//var config = require('config.js').base64;

var path= './mobile-boyi-release';

gulp.task("js",function(){
    return gulp.src([path+'/**/*.js','!./node_modules/**/*.*','!./*.js'])
        .pipe(babel({"presets":['es2015','react'],"plugins": ["transform-remove-strict-mode"]}))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('./HtmlPackage/'))
        .pipe(notify({ message: 'js task ok' }));
})

//压缩html
gulp.task('html',function(){
    return gulp.src([path+'/**/*.html','!./node_modules/**/*.*'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,  //压缩页面JS
            minifyCSS: true  //压缩页面CSS
        }))
        .pipe(gulp.dest('./HtmlPackage/'))
        .pipe(notify({ message: 'html task ok' }));
})

//压缩css
gulp.task('css', function() {
    return gulp.src([path+'/**/*.css','!./node_modules/**/*.*'])
        .pipe(minifycss())
        .pipe(gulp.dest('./HtmlPackage/'))
        .pipe(notify({ message: 'css task ok' }));
});


// 压缩图片
gulp.task('img', function() {
    return gulp.src(path+'/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./HtmlPackage/images'))
        .pipe(notify({ message: 'img task ok' }));
});


/*// 压缩图片
gulp.task('copy', function() {
    return gulp.src([path+'/!**!/fonts/!*.*','!./node_modules/!**!/!*.*'])
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/'))
        .pipe(notify({ message: 'css task ok' }));
});*/

gulp.task('clean', function() {
    return gulp.src(['./dist/*'], {read: false})
        .pipe(clean());
});



gulp.task("myModule",function(){
    return gulp.src(['./js/selfModule.js'])
        .pipe(babel({presets:['es2015','react']}))
         .pipe(uglify().on('error', function(e){
         console.log(e);
         }))
        .pipe(gulp.dest('./HtmlPackage'))
        .pipe(notify({ message: 'js task ok' }));
});

//执行任务
gulp.task('build_GB',['clean'],function(){
    gulp.run('html','js','css','img');//执行


});

gulp.task("watch",function(){
    gulp.run('myModule');//执行
    gulp.watch(['js/selfModule.js'], ['myModule']);
});

