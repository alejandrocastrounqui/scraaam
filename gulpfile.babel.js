import gulp         from 'gulp'
import eslint       from 'gulp-eslint'
import gls          from 'gulp-live-server'
import babel        from 'gulp-babel'
import sourcemaps   from 'gulp-sourcemaps'
import clean        from 'gulp-clean'
import debug        from 'gulp-debug'
import util         from 'util'
import runSequence  from 'run-sequence'
import run          from 'gulp-run'
import fs           from 'fs'
import path         from 'path'
import yaml         from 'node-yaml'

let config = {}
!function(){
  const src     = 'src'
  const dist    = 'dist'
  const backend = 'backend'
  const jshttpc = 'jshttpc'
  config = {
    src: {
      backend: {
        nojshttpc: {
          scripts: [`${src}/${backend}/**/*.js`,`!${src}/${backend}/${jshttpc}/**`]
        },
        scripts: [`${src}/${backend}/**/*.js`]
      },
      jshttpc: {
        scripts: `${src}/${jshttpc}/**/*.js`
      }
    },
    dist: {
      backend: {
        dir:`${dist}/${backend}`
      },
      jshttpc: {
        dir:`${dist}/${backend}/${jshttpc}`
      },
      server:  {
        dir:`${dist}/${backend}/server.js`
      }
    }
  }
}()

gulp.task('clean:dist', function (done) {
  return gulp.src('dist', {read: false})
    .pipe(clean())
});

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('transpile:backend', () => {
  return gulp.src(config.src.backend.nojshttpc.scripts)
    .pipe(debug())
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist.backend.dir))
})

gulp.task('transpile:jshttpc', () => {
  return gulp.src(config.src.jshttpc.scripts)
    .pipe(debug())
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist.jshttpc.dir))
})

gulp.task('transpile', ['transpile:backend', 'transpile:jshttpc'])

gulp.task('serve:backend', function(done) {
  runSequence(
    'clean:dist',
    'transpile',
    function(){
      var server = gls.new(config.dist.server);
      server.start()
      gulp.watch(config.src.backend.nojshttpc.scripts, ['transpile:backend']);
      gulp.watch(config.src.jshttpc.scripts, ['transpile:jshttpc']);
      gulp.watch(config.dist.backend.scripts, function () {
        server.start.bind(server)()
      });
      // gulp.watch('dist/backend/**/*.js', server.start.bind(server)) //restart my server
    }
  )
});

gulp.task('backend-coverage', function (done) {
  return run('npm run backend-coverage').exec();
});

gulp.task('frontend-coverage', function (done) {
  return run('npm run frontend-coverage').exec();
});

gulp.task('coverage-report', function (done) {
  return run('npm run coverage-report').exec();
});

gulp.task('coverage-upload', function () {
  const yamlFile = ['codecov.yml', '.codecov.yml'].reduce(function (result, file) {
    return result || (fs.existsSync(path.resolve(process.cwd(), file)) ? file : undefined)
  }, undefined)
  if(yamlFile){
    const codecovConfig = yaml.readSync(yamlFile);
    util.log(codecovConfig)
    let token = codecovConfig.codecov.token
    return run(`npm run coverage-upload -- -t ${token}`).exec();
  }
  else{
    throw new Error('codecov.yml not found')
  }
});

gulp.task('default', function () {
  runSequence(
    'lint',
    'backend-coverage',
    'frontend-coverage',
    'coverage-report',
    'coverage-upload'
  )
});















//
