const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
const browserify = require("browserify");
const watchify = require("watchify");
const exorcist = require("exorcist");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const bs = require("browser-sync");
const chaf = require("connect-history-api-fallback");
const path = require("path");

// Esta constante indica si la variable de entorno NODE_ENV es
// production o no. En caso de que NODE_ENV sea igual a "production",
// el código se minificará y se realizarán algunas optimizaciones
// para reducir el tamaño del site.
const isProduction = (process.env.NODE_ENV === "production");

// Devuelve el bundler en el caso de que éste exista, en caso contrario
// crea un nuevo bundler y lo retorna.
const getBundler = (function() {
  let bundler;
  return function() {
    if (!bundler) {
      // Creamos el bundler.
      bundler = browserify({
        paths: ["src/scripts"],
        debug: !isProduction,
        cache: {},
        packageCache: {}
      });

      // Añadimos el código que va a compilar browserify.
      bundler.add("src/scripts/index.js");

      // Si no estamos en un entorno de producción, entonces
      // añadimos watchify
      if (!isProduction) {
        bundler.plugin(watchify);
        bundler.on("update", bundle);
      }

      // Añadimos las transformaciones pertinentes.
      bundler.transform("babelify", { presets: ["latest"], plugins: ["istanbul"] });
      bundler.transform("installify");
      bundler.transform("uglifyify", { global: true });
    }
    return bundler;
  };
}());

// Esta función se encarga de generar el archivo index.js que contendrá
// todo el código de nuestra web (Single Page Application).
function bundle() {
  return getBundler()
    .bundle()
    .on("error", (err) => {

    })
    .pipe(exorcist("dist/index.js.map"))
    .pipe(source("index.js"))
    .pipe(gulp.dest("dist"));
}

gulp.task("scripts", () => bundle());

gulp.task("styles", () => {
  gulp.src("src/styles/index.styl")
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.stylus({
      import: path.join(__dirname, "node_modules", "normalize-styl", "normalize.styl"),
      compress: isProduction
    }))
    .pipe(plugins.sourcemaps.write("."))
    .pipe(gulp.dest("dist"))
    .pipe(bs.stream());
});

gulp.task("templates", () => {
  const stream = gulp.src("src/templates/index.pug")
    .pipe(plugins.plumber())
    .pipe(plugins.pug({
      locals: {
        title: "",
        description: "",
        keywords: [""]
      },
      pretty: !isProduction
    }))
    .pipe(gulp.dest("dist"))
    .pipe(bs.stream());
});

gulp.task("build", ["scripts", "styles", "templates"]);

gulp.task("watch", ["build"], () => {
  gulp.watch("src/styles/**/*.styl", ["styles"]);
  gulp.watch("src/templates/**/*.pug", ["templates"]);
});

gulp.task("bs", ["watch"], () => {
  bs.init({
    server: {
      middleware: [chaf()],
      baseDir: "dist"
    }
  });
});

gulp.task("default", ["bs"]);
