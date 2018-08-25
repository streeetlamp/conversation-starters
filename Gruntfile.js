module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Grunt-sass 
        sass: {
          app: {
            files: [{
              expand: true,
              cwd: 'scss',
              src: ['*.scss'],
              dest: 'scss/css',
              ext: '.css'
            }]
          },
          options: {
            sourceMap: false, 
            outputStyle: 'nested', 
          }
        },

        watch: {
            scss: {
              files: ['scss/**/*.scss'],
              tasks: ['sass']
            },
            css: {
                files: ['scss/css/**/*.css']
            },
            js: {
                files: ['js/**/*.js','!js/main.js'],
                tasks: ['concat']
            },
            livereload: {
                files: ['**/*.html', '**/*.php', '**/*.js', 'scss/**/*.css'],
                options: { livereload: true }
            }
        },


        browserSync: {
            bsFiles: {
                src : 'scss/css/style.css'
            },
            options: {
                watchTask: true, // < VERY important
                server: {
                    baseDir: "./"
                }
            }
        },


        autoprefixer: {
            dist: {
                files: {
                    'build/css/style.css' : 'scss/css/style.css'
                }
            }
        },

        cmq: {
            your_target: { 
                files: {
                    'build/css/style.css' : 'build/css/style.css'
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'build/css/style.css': ['build/css/style.css']
                }
            }
        },

        jshint: {
            all: [
                'js/*.js'
            ],
            options: {
                jshintrc: 'js/.jshintrc'
            }
        },

        concat: {   
            scripts: {
                src: [
                    'js/scripts/libs/*.js', // All JS in the libs folder
                    'js/scripts/scripts.js'  // This specific file
                ],
                dest: 'js/main.js',
            }
        },

        uglify: {
            scripts: {
                src: 'js/main.js',
                dest: 'build/js/main.js'
            }
        },

        concurrent: {
            watch: {
                tasks: ['watch', 'browserSync'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

    });

    // 3. Where we tell Grunt we plan to use this plug-in.

    // Sass
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // JS
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // building of things
    grunt.loadNpmTasks('grunt-contrib-copy');
   
    // Browser Reload + File Watch
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('init', ['build']);

    // Run our devleoppment environment
    grunt.registerTask('dev', ['browserSync','watch']);

    // cleans directories, does everything for css, js, and images for deploy
    grunt.registerTask('build', ['includes', 'includes:build', 'sass', 'autoprefixer', 'cmq', 'cssmin', 'concat', 'uglify']);
};
