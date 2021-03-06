module.exports = function (grunt) {
    'use strict';
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time at the end
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-bootlint');

    var distPath = 'dist/';
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/angular-flash.js': 'src/angular-flash.js'
                }
            }
        },
        banner: '/*! angular-flash - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed MIT */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            basic: {
              src: [distPath + 'angular-flash.js'],
              dest: distPath + 'angular-flash.js'
            },
            extras: {
              src: ['src/angular-flash.css'],
              dest: distPath + 'angular-flash.css'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: distPath + 'angular-flash.js',
                dest: distPath + 'angular-flash.min.js'
            }
        },
        cssmin: {
            target: {
                files: [{
                  expand: true,
                  cwd: '',
                  src: [distPath + '*.css', '!*.min.css'],
                  dest: '',
                  ext: '.min.css'
                }]
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            }
        },
        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 9000
                }
            }
        },
        bootlint: {
            options: {
                stoponerror: false,
                relaxerror: ['E001', 'W001', 'W002', 'W003', 'W005']
            },
            files: ['src/angular-flash.js']
        }
    });

    // Default task.
    grunt.registerTask('lint', ['jshint', 'bootlint']);
    grunt.registerTask('default', ['babel', 'lint', 'connect', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('test', ['lint', 'connect']);
};
