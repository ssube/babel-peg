var gulp = require("gulp");
var peg = require("gulp-peg");
var babel = require("gulp-babel");

gulp.task("peg", function () {
    return gulp.src("src/**/*.peg")
        .pipe(peg())
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("scripts", function () {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["peg", "scripts"]);
