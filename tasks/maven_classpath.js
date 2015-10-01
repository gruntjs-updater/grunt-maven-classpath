/*
 * grunt-maven-classpath
 * https://github.com/3urdoch/grunt-maven-classpath
 *
 * Copyright (c) 2015 Andrew Murdoch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('maven_classpath', 'Grunt plugin that determines the classpath of a maven project and makes it available to other plugins.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      tempFile: '.gruntmavenclasspath',
      jsonFile: 'classpath-' + this.target + '.json'
    });
    
    
    //grunt.log.writeln( JSON.stringify( this.data.overrides, null, 4 ) );

    var classpath = [];
    var excludeArtifacts = [];
    
    // Add overrides
    if( options.overrides ) {
      options.overrides.forEach( function( override ) {
        var path = override.overridePath;
        if( path.match( /^~\/.*/ ) ) {
          path = path.replace(/^~/, process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] );
          grunt.log.writeln(path);
        }
        if( grunt.file.exists( path ) ) {
          classpath.push( path );
          if( override.artifactId ) {
            excludeArtifacts.push( override.artifactId );
          }
        }
      });
    }

    var args = [
      '-Dmdep.outputFile=' + options.tempFile,
      '-DexcludeScope=provided',
      'dependency:build-classpath'
    ];
    
    if( excludeArtifacts.length > 0 ) {
      args.push( '-DexcludeArtifactIds=' + excludeArtifacts.join(',') );
    }
    
    // Generate classpath.json
    var done = this.async();
    grunt.util.spawn({
      cmd: 'mvn',
      args: args,
      opts: { stdio: 'ignore' }
    }, function(err, result, code) {
      if (err) {
        grunt.log.error().error('Failed to determine maven classpath');
      } else {
        var content = grunt.file.read( options.tempFile );
        grunt.log.writeln('Maven classpath is:');
        content.split(/:|;/).forEach( function( path ) {
          grunt.log.writeln(' ' + path);
          classpath.push( path );
        });
        grunt.file.delete( options.tempFile );
        grunt.file.write( options.jsonFile, JSON.stringify( classpath, null, 4 ) );
      }
      done(err);
    });
    
    
    
  });

};
