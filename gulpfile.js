/* global require, process, __dirname */
const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
const notifier = require("node-notifier");
const browserify = require("browserify");
const watchify = require("watchify");
const babelify = require("babelify");
const envify = require("envify/custom");
const exorcist = require("exorcist");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const bs = require("browser-sync");
const chaf = require("connect-history-api-fallback");
const path = require("path");

// Título que se usará en las notificaciones de gulp-notify.
const NOTIFY_TITLE = "Código Lúdico";

// Esta constante indica si la variable de entorno NODE_ENV es
// production o no. En caso de que NODE_ENV sea igual a "production",
// el código se minificará y se realizarán algunas optimizaciones
// para reducir el tamaño del site.
const isDevelopment = (process.env.NODE_ENV === "development");
const isPreproduction = (process.env.NODE_ENV === "preproduction");
const isProduction = (process.env.NODE_ENV === "production");

// notifica que se ha actualizado alguna parte del
// sistema.
const notify = (function() {
  const queue = [];
  let timeout = null;
  return function(msg) {
    if (timeout) {
      clearTimeout(timeout);
    }
    queue.push(msg);
    timeout = setTimeout(() => {
      notifier.notify({
        title: NOTIFY_TITLE,
        icon: path.join(__dirname, "node_modules", "gulp-notify", "assets", "gulp.png"),
        message: queue.join("\n")
      });
      while (queue.pop());
    }, 1000);
  };
}());

// crea una notificación con un texto.
function notification(msg) {
  return function() { notify(msg); };
}

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
      bundler.on("error", plugins.notify.onError({
        message: "<%= error.message %>",
        title: NOTIFY_TITLE
      }));

      // Si no estamos en un entorno de producción, entonces
      // añadimos watchify
      if (!isProduction) {
        bundler.plugin(watchify);
        bundler.on("update", bundle);
        bundler.on("log", (msg) => {
          const watchify = plugins.util.colors.cyan("watchify");
          plugins.util.log(`Updating '${watchify}' ${msg}`);
          notify("JavaScript actualizado");
        });
      }

      // Añadimos las transformaciones pertinentes.
      bundler.transform(envify({ NODE_ENV: process.env.NODE_ENV }));
      bundler.transform(babelify.configure({ presets: ["latest"] }));

      if (isProduction || isPreproduction) {
        // En este punto lo que hacemos es minificar, comprimir y
        // optimizar el código (eliminado código muerto, etc).
        bundler.transform("uglifyify", {
          global: true,
          mangle: true,
          compress: true
        });
      }
    }
    return bundler;
  };
}());

// Esta función se encarga de generar el archivo index.js que contendrá
// todo el código de nuestra web (Single Page Application).
function bundle() {
  return getBundler()
    .bundle()
    .on("error", plugins.notify.onError({
      message: "<%= error.message %>",
      title: NOTIFY_TITLE
    }))
    .pipe(exorcist("dist/index.js.map"))
    .pipe(source("index.js"))
    .pipe(gulp.dest("dist"));
}

// Tarea de creación de los scripts.
gulp.task("scripts", () => bundle());

// Tarea de creación de estilos.
gulp.task("styles", () => {
  const stream = gulp.src("src/styles/index.styl")
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError({
        message: "<%= error.message %>",
        title: NOTIFY_TITLE
      })
    }))
    .pipe(plugins.sourcemaps.init({
      largeFile: true
    }))
    .pipe(plugins.stylus({
      import: path.join(__dirname, "node_modules", "normalize-styl", "normalize.styl"),
      compress: isProduction
    }))
    .pipe(plugins.sourcemaps.write(".", {
      sourceRoot: "/src/styles",
      mapSources(sourcePath) {
        if (sourcePath.indexOf("normalize.styl") >= 0) {
          return "normalize.styl";
        }
        return sourcePath;
      }
    }))
    .pipe(gulp.dest("dist"))
    .pipe(bs.stream());

  return stream;
});

// Tarea de creación de plantillas.
gulp.task("templates", () => {
  const stream = gulp.src("src/templates/index.pug")
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError({
        message: "<%= error.message %>",
        title: NOTIFY_TITLE
      })
    }))
    .pipe(plugins.pug({
      locals: {
        title: "Template",
        description: "Template",
        keywords: ["template"]
      },
      pretty: !isProduction
    }))
    .pipe(gulp.dest("dist"))
    .pipe(bs.stream());

  return stream;
});

// Tarea de construcción de la plantilla.
gulp.task("build", ["scripts", "styles", "templates"]);

// Tarea de observación. Se encarga de observar los archivos de estilos y
// plantillas para asegurar que se vuelven a generar.
gulp.task("watch", ["build"], () => {
  gulp.watch("src/styles/**/*.styl", ["styles", notification("CSS Actualizado")]);
  gulp.watch("src/templates/**/*.pug", ["templates", notification("HTML Actualizado")]);
});

// Tarea de Browser Sync.
gulp.task("bs", ["watch"], () => {
  bs.init({
    server: {
      middleware: [chaf()],
      baseDir: "dist"
    }
  });
});

// Tarea por defecto.
gulp.task("default", ["bs"]);
