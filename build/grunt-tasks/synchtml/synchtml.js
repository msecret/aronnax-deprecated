/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */
var fs = require('fs');

module.exports = function (grunt) {
	'use strict';

  grunt.registerTask('synchtml', 'Will sync the passed in files to the outside \
      php directory for lizard server', function() {

    var files = grunt.config.get().synchtml.files

    if (!files) {
			grunt.log.error('Please give us some files');
			return false;
		}

    files = grunt.file.expand(files);
    files.forEach(function(file, idx) {
      var srcFile = fs.readFileSync(file, 'utf-8');
      var result = fs.writeFileSync('../php/' + file, srcFile, 'utf-8');
      grunt.log.write('HTML file synced: ' + file);
    });
  });
};