module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: "// Copyright (c) <%= grunt.template.today('yyyy') %>" +
                  "<%= pkg.author.name %>\n" +
              "// All Rights Reserved\n" +
              "// <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
              "// <%= pkg.homepage %> \n" +
              "// <%= grunt.template.today('yyyy-mm-dd') %>\n" +
              "// Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> \n"
    },
    requirejs: {
      options: {
        mainConfigFile: "build/dev.build.js"
      },
      compile: {
        options: {
          wrap: {
            start: "<%= pkg.author.name %>" +
                   "(function() {",
            end: "}());"
          }
        }
      },
      concat: {
        options: {
          optimize: 'none',
          wrap: {
            start: "<%= meta.banner %>"
          }
        }
      }
    },
    closureBuilder: {
      options: {
        closureLibraryPath: 'lib/closure-library',
        compile: false,
        execOpts: {
          maxBuffer: 999999 * 1024
        },
        inputs: 'src/*.js',
        output_file: 'dist/aronnax.js',
        output_mode: 'script'
      },
      dev: {
        src: 'src/',
        dest: 'build/aronnax.js'
      }
    },
    closureCompiler: {
      options: {
        checkModified: true,
        closureCompiler: 'build/closure-compiler/compiler.jar',
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          process_common_js_modules: true,
          transform_amd_modules: true
        },
        execOpts: {
          maxBuffer: 999999 * 1024
        }
      },
      dev: {
        TEMPcompilerOpts: {
          define: ["'goog.DEBUG=false'"],
          formatting: 'PRETTY_PRINT',
          summary_detail_level: 3,
          warning_level: 'verbose'
        },
        src: 'src/**/*.js',
        dest: 'build.aronnax.min.js'
      },
      prod: {
        src: 'src/**/*.js',
        dest: 'build.aronnax.min.js'
      }
    },
    clean: ['src', 'test'],
    config: {
      files: {
        src: 'build/dev.config.json',
        dest: 'src/config.js'
      },
      options: {
        module: 'aronnax/Config'
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
            baseUrl: 'src'
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
          src: [ 'src/**/*.js', 'test/**/*.js' ]
        }
      }
    },
    'amd-doc': {
      all: {
        files: {
            src: 'src/**/*.js'
        },
        options: {
          out: 'doc',
          cache: 'doc/cache',
          mixin: 'doc/mixin',
          repoview: 'https://github.com/msecret/aronnax/src',
          requirejs: {
            mainConfigFile: "build/dev.build.js",
            name: 'aronnax/main'
          },
          types: (function() {
            var types = [];

            //make all built-in types link to their MDN pages
            ['Number', 'String', 'Object', 'Function', 'Array', 'RegExp',
                'Boolean'].forEach(function(val) {
              types.push({
                  name: val,
                  link: 'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/' + val
              });
            });

            types.push({
              name: 'Any',
              link: 'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects'
            });

            types.push({
              name: 'void',
              link: 'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/undefined'
            });

            types.push({
              name: 'Element',
              link: 'https://developer.mozilla.org/en-US/docs/DOM/element'
            });

            types.push({
              name: 'Constructor',
              link: 'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/constructor'
            });

            types.push({
              name: 'require',
              link: 'http://requirejs.org/'
            });

            return types;
          })()
        }
      }
    },
    watch: {
      scripts: {
        files: ['test/**/*.js', 'src/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
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
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-amd-doc');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-global-config');

  // Default task(s).
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('concat', 'requirejs:concat');
  grunt.registerTask('compile', 'requirejs:compile');
  grunt.registerTask('test', 'jasmine:test');
  grunt.registerTask('integration', 'jasmine:integration');
  grunt.registerTask('banner', 'usebanner');
  grunt.registerTask('doc', 'amd-doc');

  grunt.registerTask('default', ['lint', 'concat', 'compile', 'test', 'doc']);

};
