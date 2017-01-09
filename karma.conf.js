// Configuración de Karma
// Generado el Domingo 08 de Enero de 2017 21:13:31 GMT+0100
module.exports = function(config) {
  config.set({
    // Ruta base
    basePath: "",
    // Frameworks que vamos a usar.
    // Frameworks disponibles: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["browserify","mocha"],
    // Lista de archivos / patrones a cargar en el navegador.
    files: [
      "src/scripts/**/*.js",
      "test/**/*.js"
    ],
    // Lista de archivos a excluir
    exclude: [

    ],
    // Archivos que se deben preprocesar antes de comenzar los tests.
    // Preprocesadores disponibles: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "src/scripts/**/*.js": ["browserify"],
      "test/**/*.js": ["browserify"]
    },
    // Configuración de browserify.
    browserify: {
      debug: true,
      paths: ["src/scripts"],
      transform: [
        ["babelify", { presets: ["latest"], plugins: ["istanbul"] }]
      ]
    },
    // Configuración de la cobertura de scripts.
    coverageReporter: {
      type : "html",
      dir : "coverage/"
    },
    // Reporter que se usará.
    // Valores posibles: "dots", "progress", "mocha"
    // Reporters disponibles: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["mocha","coverage"],
    // Puerto del Web Server
    port: 9876,
    // Activa / desactiva colores en el output.
    colors: true,
    // Nivel de logging
    // Valores: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // Activa / desactiva si se escuchan o no los cambios en los archivos de los tests.
    autoWatch: true,
    // Comienza los navegadores.
    // Lanzadores disponibles: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],
    // Modo de integración continua.
    // Si es true, sólo se ejecutarán una vez los tests.
    singleRun: false,
    // Nivel de concurrencia.
    // Cuantos navegadores deben arrancar simultáneamente.
    concurrency: Infinity
  });
};
