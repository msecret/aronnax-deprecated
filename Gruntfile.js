module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: "// Copyright (c) <%= grunt.template.today('yyyy') %>" +
                  "<%= pkg.author.name %>\n" +
              "// All Rights Reserved\n" +
              "// <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
              "// <%= pkg.homepage %>\n" +
              "// Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %>\n"
    },
    requirejs: {
      options: {
        mainConfigFile: "build/dev.build.js"
      },
      compile: {
        options: {
          almond: true,
          replaceRequireScript: [{
            files: ['index.html'],
            module: '<%= pkg.name %>.min'
          }],
          out: 'dist/<%= pkg.name %>.min.js'
        }
      },
      concat: {
        options: {
          optimize: 'none',
          out: "dist/<%= pkg.name %>.js",
          wrap: {
            start: "<%= meta.banner %>"
          }
        }
      }
    },
    clean: ['dist/*', 'doc/**/*'],
    config: {
      files: {
        src: 'build/dev.config.json',
        dest: 'src/config.js'
      },
      options: {
        module: '<%= pkg.name %>/Config'
      }
    },
    jasmine: {
      options: {
        helpers: ['lib/components/*.js',
          'lib/components/sinonjs/sinon.js',
          'lib/components/jasmine-sinon/lib/jasmine-sinon.js',
          'lib/components/underscore/underscore.js',
          'test/matchers.js'
        ],
        keepRunner: true,
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {
            baseUrl: './'
          },
          requireConfigFile: 'build/dev.build.js'
        }
      },
      integration: {
        options: {
          outfile: '_IntegrationsRunner.html',
          specs: 'test/**/*_integrationtest.js'
        }
      },
      test: {
        options: {
          specs: 'test/**/*_test.js'
        }
      }
    },
    usebanner: {
      banner: {
        options: {
          position: 'top' || 'bottom',
          banner: '<%= meta.banner %>'
        },
        files: {
          src: [ 'dist/aronnax.js', 'dist/aronnax.min.js' ]
        }
      }
    },
    jsdoc: {
      dist: {
        src: ['src/*.js'],
        options: {
          destination: 'doc',
          'private': true
        }
      }
    },
    watch: {
      scripts: {
        files: ['test/**/*.js', 'src/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        loopfunc: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        sub: true,
        undef: true,
        boss: true,
        debug: true,
        eqnull: true,
        multistr: true,
        // environments
        browser: true,
        devel: true,
        node: true,

        globals: {
          afterEach: true,
          aronnax: true,
          beforeEach : true,
          define: true,
          Benchmark: true,
          describe : true,
          expect : true,
          goog: true,
          require: true,
          jasemine: true,
          sinon: true,
          module: true,
          waitsFor: true,
          it : true,
          _: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-amd-doc');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-global-config');

  // Default task(s).
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('concat', 'requirejs:concat');
  grunt.registerTask('compile', 'requirejs:compile');
  grunt.registerTask('test', 'jasmine:test');
  grunt.registerTask('integration', 'jasmine:integration');
  grunt.registerTask('banner', 'usebanner');
  grunt.registerTask('doc', 'jsdoc');

  grunt.registerTask('default', ['lint', 'clean', 'compile', 'banner', 'concat',
                                 'test', 'doc']);
};
