module.exports = (config) => {
  config.set({
    basePath: '.',
    frameworks: [ 'mocha' ],
    files: [
      'test/frontend/setup.js'
    ],
    preprocessors: {
      'src/frontend/**/*.js': ['coverage'],
      'test/frontend/setup.js': ['webpack']
    },
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: [ 'mocha', 'progress', 'coverage' ],
    mochaReporter: { output: 'full' },
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },
    port: 9876,
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    singleRun: true,
    coverageReporter: {
      'dir':  'coverage/',
      'type': 'html'
    }
  })
}
