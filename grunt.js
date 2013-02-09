/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    jasmine : {
      src : 'dist/aronnax.js',
      specs : 'test/**/*.js'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          '<file_strip_banner:src/main.js>'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    closureDepsWriter: {
      deps: {
        closureLibraryPath: 'lib/closure-library',
        output_file: 'dist/deps.js',
        options: {
          root_with_prefix: '"src ../../../../src"'
        }
      }
    },
    closureBuilder: {
      concat: {
        closureLibraryPath: 'lib/closure-library',
        inputs: 'src/*.js',
        namespaces: 'aronnax.main',
        output_file: 'dist/aronnax.js',
        output_mode: 'script',
        compile: false,
        root: [
          'src',
          'lib/closure-library/closure',
          'lib/closure-library/third_party/closure'
        ]
      }
    },
    closureCompiler: {
      compile: {
        closureCompiler: 'build/closure-compiler/compiler.jar',
        js: '<config:closureBuilder.concat.output_file>',
        output_file: 'dist/aronnax.min.js',
        checkModified: true,
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS'
        }
      },
      compile_debug: {
        closureCompiler: 'build/closure-compiler/compiler.jar',
        js: '<config:concat.dist.dest>',
        output_file: 'dist/aronnax.min.js',
        checkModified: false,
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          define: ["'goog.DEBUG=false'"],
          formatting: 'PRETTY_PRINT',
          summary_detail_level: 3
        }
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
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
        devel: true
      },
      globals: {
        aronnax: false,
        goog: false,
        jasemine: false,
        describe : false,
        beforeEach : false,
        expect : false,
        it : false,
        spyOn : false
      }
    },
    synchtml: {
      files: 'index.html'
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadTasks('build/grunt-tasks/synchtml');

  grunt.registerTask('test', 'jasmine');
  grunt.registerTask('compile', 'closureCompiler:compile');
  grunt.registerTask('compile-debug', 'closureCompiler:compile_debug');
  grunt.registerTask('deps', 'closureDepsWriter:deps');
  grunt.registerTask('concat', 'closureBuilder:concat');
  grunt.registerTask('sync-html', 'synchtml');


  // Default task.
  grunt.registerTask('default', 'lint deps concat test compile sync-html');

};
