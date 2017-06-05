module.exports = (config) => {
  config.set({
    basePath: 'test/frontend',
    frameworks: [ 'mocha' ],
    files: [ 'setup.js' ],

    preprocessors: {
      "setup.js": ['webpack', 'coverage']
    },
    webpack: require("./webpack.config"),
    webpackMiddleware: {
      stats: "errors-only"
    },

    reporters: [ 'progress', 'coverage' ],
    mochaReporter: { output: 'full' },
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },
    port: 9876,
    browsers: ['Chrome'],
    singleRun: true,
  })
}
