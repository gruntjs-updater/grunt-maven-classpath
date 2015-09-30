'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.maven_classpath = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(4);

    var actual = grunt.file.readJSON('classpath-default_options.json');
    
    test.equal( actual.length, 3, 'Should include 3 classpath entries' );
    test.equal( actual[0].match(/.*\/mylib-0\.0\.1-SNAPSHOT\.jar$/) != null, true, 'First entry should be "mylib"' );
    test.equal( actual[1].match(/.*\/commons-lang3-3\.4\.jar$/) != null, true, 'Second entry should be commons-lang3' );
    test.equal( actual[2].match(/.*\/commons-io-2\.3\.jar$/) != null, true, 'Third entry should be commons-io' );

    test.done();
  },
  custom_options: function(test) {
    test.expect(4);

    var actual = grunt.file.readJSON('classpath-custom_options.json');
    
    test.equal( actual.length, 3, 'Should include 3 classpath entries' );
    test.equal( actual[0], "mylib/build/classes", 'First entry should be "mylib/build/classes"' );
    test.equal( actual[1].match(/.*\/commons-lang3-3\.4\.jar$/) != null, true, 'Second entry should be commons-lang3' );
    test.equal( actual[2].match(/.*\/commons-io-2\.3\.jar$/) != null, true, 'Third entry should be commons-io' );

    test.done();
  },
  home_relative: function(test) {
    test.expect(4);

    var actual = grunt.file.readJSON('classpath-home_relative.json');
    
    test.equal( actual.length, 3, 'Should include 3 classpath entries' );
    test.equal( actual[0], process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] + "/", 'First entry should be "~/"' );
    test.equal( actual[1].match(/.*\/commons-lang3-3\.4\.jar$/) != null, true, 'Second entry should be commons-lang3' );
    test.equal( actual[2].match(/.*\/commons-io-2\.3\.jar$/) != null, true, 'Third entry should be commons-io' );

    test.done();
  },
};
