module.exports = {
  proxies: null,

  paths: {
    html : {
      src: ['app/**/*.html'],
      dest: "www/build"
    },
    sass: {
      src: ['app/theme/app.+(ios|md).scss'],
      dest: 'www/build/css',
      include: [
        'node_modules/ionic-angular',
        'node_modules/ionicons/dist/scss'
      ]
    },
    fonts: {
      src: ['node_modules/ionic-angular/fonts/**/*.+(ttf|woff|woff2)'],
      dest: "www/build/fonts"
    },
    watch: {
      sass: ['app/**/*.scss'],
      html: ['app/**/*.html'],
      livereload: [
        'www/build/**/*.html',
        'www/build/**/*.js',
        'www/build/**/*.css'
      ]
    }
  },

  autoPrefixerOptions: {
    browsers: [
      'last 2 versions',
      'iOS >= 7',
      'Android >= 4',
      'Explorer >= 10',
      'ExplorerMobile >= 11'
    ],
    cascade: false
  },

  // hooks execute before or after all project-related Ionic commands
  // (so not for start, docs, but serve, run, etc.) and take in the arguments
  // passed to the command as a parameter
  //
  // The format is 'before' or 'after' + commandName (uppercased)
  // ex: beforeServe, afterRun, beforePrepare, etc.
  hooks: {
    beforeServe: function(argv) {
      var fs = require('fs'),
      wrench = require('wrench'),
      appImgPath = 'app/img',
      buildImgPath = 'www/build/img';

      removeOldImages();

      function removeOldImages() {
        fs.access(buildImgPath, function(err) {
          if (!err) {
            console.log('\x1b[33m' + 'Remove old images from previous build', '\x1b[0m');
            wrench.rmdirSyncRecursive(buildImgPath);
            console.log('\x1b[33m' + 'All images removed', '\x1b[0m');
          }
          copyImages();
        });
      }

      function copyImages() {
        fs.access(appImgPath, function(err) {
          if (err) {
            console.log('\x1b[34m' + 'Warning! No images to copy', '\x1b[0m \n');
            return;
          }
          console.log('\x1b[33m' + 'Copy new images to build folder', '\x1b[0m');
          wrench.copyDirSyncRecursive(appImgPath, buildImgPath);
          console.log('\x1b[33m' + 'All images copied', '\x1b[0m \n');
        })
      }
    }
  }
};
