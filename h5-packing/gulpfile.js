/**
 * Created by pobo on 2016/11/3.
 */
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin'); //html压缩
var uglify = require('gulp-uglify');//js压缩
var notify = require('gulp-notify');//提示信息
var minifycss = require('gulp-minify-css');//压缩css
var imagemin = require('gulp-imagemin');//图片压缩
var pngcrush = require('imagemin-pngcrush');
var react = require('gulp-react');
var es2015 = require('babel-preset-es2015');
var babel = require("gulp-babel");

var path= './mobile-boyi-release';
// ------------------------------bprespb

// gulp.task("js", function () {
//     return gulp.src(['./new-boyi/**/*.js'])
//     // .pipe(babel({"presets":['es2015','react'],"plugins": ["transform-remove-strict-mode"]}))
//         .pipe(uglify().on('error', function (e) {
//             console.log(e);
//         }))
//         .pipe(gulp.dest('./pbrespb/'))
//         .pipe(notify({message: 'js task ok'}));
// });
//
// gulp.task('html', function () {
//     return gulp.src(['./new-boyi/**/*.html'])//配置将要压缩的文件入口
//         .pipe(htmlmin({
//             collapseWhitespace: true,
//             removeComments: true,
//             minifyJS: true,  //压缩页面JS
//             minifyCSS: true  //压缩页面CSS
//         }))
//         .pipe(gulp.dest('./pbrespb/'))//将压缩的文件输出到此文件夹下面
//         .pipe(notify({message: 'html task ok'}));//打印信息
//
// });
//
// gulp.task('css', function () {
//     return gulp.src(['./new-boyi/**/*.css'])
//         .pipe(minifycss())
//         .pipe(gulp.dest('./pbrespb/'))
//         .pipe(notify({message: 'css task ok'}));
// });
//
// gulp.task('img', function () {
//     return gulp.src(['./new-boyi/**/*.png'])
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngcrush()]
//         }))
//         .pipe(gulp.dest('./pbrespb/'))
//         .pipe(notify({message: 'img task ok'}));
// });
//
//
// gulp.task('build', function () {
//     gulp.run('html', 'js', 'img', 'css');//执行
//     // watch 监听变化
//     gulp.watch(['./new-boyi/**/*.html'], function () {
//         gulp.run('html')
//     });
//     gulp.watch(['./new-boyi/**/*.css'], ['css']);
//     gulp.watch(['./new-boyi/**/*.js'], ['js']);
//     gulp.watch(['./new-boyi/**/*.png'], ['img']);
// });

// ---------------------------pbresxy

// gulp.task("js", function () {
//     return gulp.src(['./new-xy/**/*.js'])
//     // .pipe(babel({"presets":['es2015','react'],"plugins": ["transform-remove-strict-mode"]}))
//         .pipe(uglify().on('error', function (e) {
//             console.log(e);
//         }))
//         .pipe(gulp.dest('./pbresxy/'))
//         .pipe(notify({message: 'js task ok'}));
// });
//
// gulp.task('html', function () {
//     return gulp.src(['./new-xy/**/*.html'])//配置将要压缩的文件入口
//         .pipe(htmlmin({
//             collapseWhitespace: true,
//             removeComments: true,
//             minifyJS: true,  //压缩页面JS
//             minifyCSS: true  //压缩页面CSS
//         }))
//         .pipe(gulp.dest('./pbresxy/'))//将压缩的文件输出到此文件夹下面
//         .pipe(notify({message: 'html task ok'}));//打印信息
//
// });
//
// gulp.task('css', function () {
//     return gulp.src(['./new-xy/**/*.css'])
//         .pipe(minifycss())
//         .pipe(gulp.dest('./pbresxy/'))
//         .pipe(notify({message: 'css task ok'}));
// });
//
// gulp.task('img', function () {
//     return gulp.src(['./new-xy/**/*.png'])
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngcrush()]
//         }))
//         .pipe(gulp.dest('./pbresxy/'))
//         .pipe(notify({message: 'img task ok'}));
// });
//
// gulp.task('build', function () {
//     gulp.run('html', 'js', 'img', 'css');//执行
//     // watch 监听变化
//     gulp.watch(['./new-xy/**/*.html'], function () {
//         gulp.run('html')
//     });
//     gulp.watch(['./new-xy/**/*.css'], ['css']);
//     gulp.watch(['./new-xy/**/*.js'], ['js']);
//     gulp.watch(['./new-xy/**/*.png'], ['img']);
// });

// --------------------------------pbresbh

// gulp.task("js", function () {
//     return gulp.src(['./new-bh/**/*.js'])
//     // .pipe(babel({"presets":['es2015','react'],"plugins": ["transform-remove-strict-mode"]}))
//         .pipe(uglify().on('error', function (e) {
//             console.log(e);
//         }))
//         .pipe(gulp.dest('./pbresbh/'))
//         .pipe(notify({message: 'js task ok'}));
// });
//
// gulp.task('html', function () {
//     return gulp.src(['./new-bh/**/*.html'])//配置将要压缩的文件入口
//         .pipe(htmlmin({
//             collapseWhitespace: true,
//             removeComments: true,
//             minifyJS: true,  //压缩页面JS
//             minifyCSS: true  //压缩页面CSS
//         }))
//         .pipe(gulp.dest('./pbresbh/'))//将压缩的文件输出到此文件夹下面
//         .pipe(notify({message: 'html task ok'}));//打印信息
//
// });
//
// gulp.task('css', function () {
//     return gulp.src(['./new-bh/**/*.css'])
//         .pipe(minifycss())
//         .pipe(gulp.dest('./pbresbh/'))
//         .pipe(notify({message: 'css task ok'}));
// });
//
// gulp.task('img', function () {
//     return gulp.src(['./new-bh/**/*.png'])
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngcrush()]
//         }))
//         .pipe(gulp.dest('./pbresbh/'))
//         .pipe(notify({message: 'img task ok'}));
// });
//
//
// gulp.task('build', function () {
//     gulp.run('html', 'js', 'img', 'css');//执行
//     // watch 监听变化
//     gulp.watch(['./new-bh/**/*.html'], function () {
//         gulp.run('html')
//     });
//     gulp.watch(['./new-bh/**/*.css'], ['css']);
//     gulp.watch(['./new-bh/**/*.js'], ['js']);
//     gulp.watch(['./new-bh/**/*.png'], ['img']);
// });

// ------------------------------------pbresgf

// gulp.task("js", function () {
//     return gulp.src(['./new-gf/**/*.js'])
//     // .pipe(babel({"presets":['es2015','react'],"plugins": ["transform-remove-strict-mode"]}))
//         .pipe(uglify().on('error', function (e) {
//             console.log(e);
//         }))
//         .pipe(gulp.dest('./pbresgf/'))
//         .pipe(notify({message: 'js task ok'}));
// });
//
// gulp.task('html', function () {
//     return gulp.src(['./new-gf/**/*.html'])//配置将要压缩的文件入口
//         .pipe(htmlmin({
//             collapseWhitespace: true,
//             removeComments: true,
//             minifyJS: true,  //压缩页面JS
//             minifyCSS: true  //压缩页面CSS
//         }))
//         .pipe(gulp.dest('./pbresgf/'))//将压缩的文件输出到此文件夹下面
//         .pipe(notify({message: 'html task ok'}));//打印信息
//
// });
//
// gulp.task('css', function () {
//     return gulp.src(['./new-gf/**/*.css'])
//         .pipe(minifycss())
//         .pipe(gulp.dest('./pbresgf/'))
//         .pipe(notify({message: 'css task ok'}));
// });
//
// gulp.task('img', function () {
//     return gulp.src(['./new-gf/**/*.png'])
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngcrush()]
//         }))
//         .pipe(gulp.dest('./pbresgf/'))
//         .pipe(notify({message: 'img task ok'}));
// });
//
// gulp.task('build', function () {
//     gulp.run('html', 'js', 'img', 'css');//执行
//     // watch 监听变化
//     gulp.watch(['./new-gf/**/*.html'], function () {
//         gulp.run('html')
//     });
//     gulp.watch(['./new-gf/**/*.css'], ['css']);
//     gulp.watch(['./new-gf/**/*.js'], ['js']);
//     gulp.watch(['./new-gf/**/*.png'], ['img']);
// });

// -----------------------------------oldh5

// gulp.task("js", function () {
//     return gulp.src([path+'/**/*.js'])
//         // .pipe(babel({"presets":['es2015','react'],"plugins": ["transform-remove-strict-mode"]}))
//         .pipe(uglify().on('error', function (e) {
//             console.log(e);
//         }))
//         .pipe(gulp.dest('./HtmlPackage/'))
//         .pipe(notify({message: 'js task ok'}));
// });
//
// gulp.task('html', function () {
//     return gulp.src([path+'/**/*.html'])//配置将要压缩的文件入口
//         .pipe(htmlmin({
//             collapseWhitespace: true,
//             removeComments: true,
//             minifyJS: true,  //压缩页面JS
//             minifyCSS: true  //压缩页面CSS
//         }))
//         .pipe(gulp.dest('./HtmlPackage/'))//将压缩的文件输出到此文件夹下面
//         .pipe(notify({message: 'html task ok'}));//打印信息
//
// });
//
// gulp.task('css', function () {
//     return gulp.src([path+'/**/*.css'])
//         .pipe(minifycss())
//         .pipe(gulp.dest('./HtmlPackage/'))
//         .pipe(notify({message: 'css task ok'}));
// });
//
// gulp.task('img', function () {
//     return gulp.src([path+'/**/*'])
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngcrush()]
//         }))
//         .pipe(gulp.dest('./HtmlPackage/'))
//         .pipe(notify({message: 'img task ok'}));
// });

// gulp.task('build', function () {
     // gulp.run('css','html','js','img');//执行
    // gulp.run('html');
    // watch 监听变化
    /*gulp.watch(['./mobile-boyi-release/!**!/!*.html'], function () {
        gulp.run('html')
    });
    gulp.watch(['./mobile-boyi-release/!**!/!*.css'], ['css']);
    gulp.watch(['./mobile-boyi-release/!**!/!*.js'], ['js']);
    gulp.watch(['./mobile-boyi-release/!**!/!*.png'], ['img']);*/
// });
/*gulp.task("js",function(){
    return gulp.src(['**!/!*.js','!./node_modules/!**!/!*.*','!./!*.js'])
        .pipe(babel({"presets":['es2015','react'],"plugins": ["transform-remove-strict-mode"]}))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(notify({ message: 'js task ok' }));
})*/

// ----------------------------------------pbresY

var pbresIn = 'pbresY/1110/1110/',
    pbresOut = '1110/1110/';
gulp.task("js", function () {
    return gulp.src(['./'+pbresIn+'/**/*.js'])
    // .pipe(babel({"presets":['es2015','react'],"plugins": ["transform-remove-strict-mode"]}))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest('./'+pbresOut+'/'))
        .pipe(notify({message: 'js task ok'}));
});

/*gulp.task('html', function () {
    return gulp.src(['./'+pbresIn+'/!**!/!*.html'])//配置将要压缩的文件入口
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,  //压缩页面JS
            minifyCSS: true  //压缩页面CSS
        }))
        .pipe(gulp.dest('./'+pbresOut+'/'))//将压缩的文件输出到此文件夹下面
        .pipe(notify({message: 'html task ok'}));//打印信息

});

gulp.task('css', function () {
    return gulp.src(['./'+pbresIn+'/!**!/!*.css'])
        .pipe(minifycss())
        .pipe(gulp.dest('./'+pbresOut+'/'))
        .pipe(notify({message: 'css task ok'}));
});

gulp.task('img', function () {
    return gulp.src(['./'+pbresIn+'/!**!/!*.png'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./'+pbresOut+'/'))
        .pipe(notify({message: 'img task ok'}));
});*/


gulp.task('build', function () {
    // gulp.run('html', 'js', 'img', 'css');//执行
    gulp.run('js');//执行
    // watch 监听变化
    gulp.watch(['.'+pbresIn+'/**/*.html'], function () {
        gulp.run('html')
    });
    gulp.watch(['./'+pbresIn+'/**/*.css'], ['css']);
    gulp.watch(['./'+pbresIn+'/**/*.js'], ['js']);
    gulp.watch(['./'+pbresIn+'/**/*.png'], ['img']);
});

//单独文件执行

// gulp.task("js", function () {
//     return gulp.src(['./pbresY/js/*.js'])
//     // .pipe(babel({"presets":['es2015','react'],"plugins": ["transform-remove-strict-mode"]}))
//         .pipe(uglify().on('error', function (e) {
//             console.log(e);
//         }))
//         .pipe(gulp.dest('./pbres/js/'))
//         .pipe(notify({message: 'js task ok'}));
// });
// gulp.task('build', function () {
//     gulp.run('js');//执行
//     // watch 监听变化
//     gulp.watch(['./pbresY/1998/**/*.js'], ['js']);
// });