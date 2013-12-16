// from grunt-contrib-livereload github README
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: '<json:package.json>',

    connect: {
      livereload: {
        options: {
          // これは connect のポート
          // livereload のポートはデフォルトだと 35729
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')];
          }
        }
      }
    },
    compass: {                  // Task
    dist: {                   // Target
      options: {              // Target options
        sassDir: 'scss',
        cssDir: 'stylesheets',
        environment: 'production'
        }
      }
    },
    // Configuration to be run (and then tested)
    regarde: {
      // fred って名前がなんだかわからないけど、とりあえずそのままにしておいた
      fred: {
        // 監視対象
        files: ['scss/*.scss','*.html'],
        tasks: ['compass','livereload']
      }
    },
    
  });

  // load task
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task
  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};