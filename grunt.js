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
      src : 'src/**/*.js',
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
    'closure-compiler': {
      compile: {
        closurePath: 'build/closure-compiler',
        js: '<config:concat.dist.dest>',
        jsOutputFile: 'dist/aronnax.min.js',
        maxBuffer: 500,
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS'
        }
      },
      compile_debug: {
        closurePath: 'build/closure-compiler',
        js: '<config:concat.dist.dest>',
        jsOutputFile: 'dist/aronnax.debug.min.js',
        maxBuffer: 500,
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          debug: true,
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
        devel: true,
        dojo: true
      },
      globals: {
        jasemine: false,
        describe : false,
        beforeEach : false,
        expect : false,
        it : false,
        spyOn : false
      }
    },
    uglify: {}
  });

  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.loadNpmTasks('grunt-closure-compiler');

  grunt.registerTask('test', 'jasmine');
  grunt.registerTask('compile', 'closure-compiler:compile');
  grunt.registerTask('compile-debug', 'closure-compiler:compile_debug');

  // Default task.
  grunt.registerTask('default', 'lint test concat compile');

};
