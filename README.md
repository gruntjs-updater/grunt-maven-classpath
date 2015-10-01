# grunt-maven-classpath

> Grunt plugin that determines the classpath of a maven project and saves it
to a JSON file that can be loaded into the configuration of other plugins.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-maven-classpath --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-maven-classpath');
```

## The "maven_classpath" task

### Overview
In your project's Gruntfile, add a section named `maven_classpath` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  maven_classpath: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.tempFile
Type: `String`
Default value: `',  '`

The name of a temporary file used by the plugin to generate the classpath.

#### options.jsonFile
Type: `String`
Default value: `'classpath-<%=target%>.json'`

The name of a json file where the final classpath is stored.

#### options.overrides
Type: `Array`
Default value: `[]`

An array of classpath overrides that replace maven dependencies with explicit
classpath entries.

### Usage Examples

#### Default Options
In this example, the default options are used to generate a classpath from the
maven pom.xml file.

```js
grunt.initConfig({
  maven_classpath: {
    main: {
      
    }
  },
});
```

When the task is run, a file named `classpath-main.json` will be generated
that contains an array of classpath entries. For example, a maven project with
three dependencies may generate the following classpath file.

```json
[
    "/Users/bob/.m2/repository/myproject/mylib-0.0.1-SNAPSHOT.jar",
    "/Users/bob/.m2/repository/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar",
    "/Users/bob/.m2/repository/commons-io/commons-io/2.3/commons-io-2.3.jar"
]
```

#### Overrides
In this example, an override is specified so that the classpath generated includes
a specific directory containing classes that overrides a maven dependency.

```js
grunt.initConfig({
  maven_classpath: {
    main: {
      options: {
        overrides: [
          {
            artifactId: 'mylib',
            overridePath: '/Users/bob/git/mylib/build/classes'
          }
        ]
      }
    }
  },
});
```

The resulting classpath skips the `mylib` dependency from the classpath and
instead includes the classes directory specified.

```json
[
    "/Users/bob/git/mylib/build/classes",
    "/Users/bob/.m2/repository/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar",
    "/Users/bob/.m2/repository/commons-io/commons-io/2.3/commons-io-2.3.jar"
]
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2015-10-01   v0.1.1   Exclude provided dependencies, fix Windows path separator issue
* 2015-09-30   v0.1.0   Initial release
