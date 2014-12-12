module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    preprocess: {
      core: {
        src: 'extension/js/agent/build/core.js',
        dest: 'extension/js/agent/build/src/core.js'
      },
      agent: {
        src: 'extension/js/agent/build/build.js',
        dest: 'extension/js/agent/build/src/agent.js'
      },
      localAgent: {
        src: 'extension/js/agent/build/localBuild.js',
        dest: 'extension/js/agent/build/src/localAgent.js'
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: 'extension/js/agent/build/src/',
        src: '*',
        dest: 'test/src/',
        flatten: true
      }
    },

    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../../../../../test/src/'
      }
    },

    instrument: {
      files: 'test/src/*.js',
      options: {
        basePath: './'
      }
    },

    mocha: {
      test: {
        options: {
          reporter: grunt.option('mocha-reporter') || 'Nyan'
        },
        src: ['extension/js/test/unit/AgentSpecRunner.html'],
        dest: './test/output/xunit.out',
      },
    },

    mochaTest: {
      tests: {
        options: {
          quiet: false,
          require: './extension/js/test/unit/setup/node.js',
          reporter: 'nyan',
          clearRequireCache: true,
          mocha: require('mocha')
        },
        src: [
          './extension/js/test/unit/setup/helpers.js',
          './extension/js/test/unit/**/*.spec.js'
        ]
      }
    },

    storeCoverage: {
      options: {
        dir: './coverage'
      }
    },
    makeReport: {
      src: 'coverage/**/*.json',
      options: {
        type: 'lcov',
        dir: 'coverage',
        print: 'detail'
      }
    },

    coveralls: {
      options: {
        src: 'coverage/lcov.info',
        force: false
      },
      default: {
        src: 'coverage/lcov.info'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'extension/css/marionette_inspector.css': 'extension/css/inspector/main.scss',
        }
      }
    },

    watch: {
      files: [
        'extension/js/agent/**/*.js',
        'extension/js/common/**/*.js',
        '!extension/js/agent/build/src/*.js',
        'extension/css/inspector/**/*.scss'
        ],
      tasks: ['build']
    },

  });


  grunt.registerTask('agent', ['preprocess']);

  grunt.registerTask('build', ['agent', 'sass']);

  grunt.registerTask('test', ['agent', 'copy', 'mocha']);

  grunt.registerTask('coverage', ['agent', 'copy', 'env:coverage', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);

  grunt.registerTask('default', ['watch']);

};
