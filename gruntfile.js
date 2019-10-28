module.exports = function(grunt) {
    grunt.initConfig({

        // define source files and their destinations
        concat: {
            js: {
                src: [
                    'app/bower_components/gentelella/vendors/jquery/dist/jquery.min.js',
                    'app/bower_components/gentelella/vendors/bootstrap/dist/js/bootstrap.min.js',
                    'app/bower_components/angular/angular.min.js',
                    'app/bower_components/angular-route/angular-route.js',
                    'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'app/bower_components/angular-cookies/angular-cookies.min.js',
                    'app/bower_components/angular-md5/angular-md5.js',
                    'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'app/bower_components/ng-img-crop-full-extended/compile/minified/ng-img-crop.js',
                    'app/bower_components/summernote/dist/summernote.min.js',
                    'app/bower_components/angular-summernote/dist/angular-summernote.min.js',
                    'app/bower_components/angular-sanitize/angular-sanitize.js',
                    'app/bower_components/angular-base64/angular-base64.js',
                    'app/bower_components/tags-input/tags-input.js',
                    'app/bower_components/angucomplete-alt/angucomplete-alt.js',
                    'app/bower_components/sockjs-client/dist/sockjs.min.js',
                    'app/main/*.js', 'app/main/controllers/*.js', 'app/main/services/*.js', 'app/js/stomp.min.js'
                    
                ],
                dest: 'app/main/uglify/concat.js'
            },
            admin: {
                src: ['app/modules/admin/*.js', 'app/modules/admin/controllers/*.js', 'app/modules/admin/services/*.js', 'app/js/stomp.min.js'],
                dest: 'app/modules/admin/uglify/concat.js'
            }
        },
        uglify: {
            client: {
                files: grunt.file.expandMapping(['app/main/uglify/concat.js', 'app/modules/admin/uglify/concat.js'], 'final/', {
                    rename: function(destBase, destPath) {
                        return destPath.replace('.js', '.min.js');
                    }
                }),
                // files: {
                //     src: 'app/main/test/concat.js', // source files mask
                //     dest: 'app/main/test/', // destination folder
                //     expand: true, // allow dynamic building
                //     flatten: true, // remove all unnecessary nesting
                //     ext: '.min.js' // replace .js to .min.js
                // },
                options: {
                    mangle: false
                }
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                // cwd: 'assets/',
                src: ['app/main/uglify/concat.min.js'],
                dest: '',
                ext: '.min.js.gz'
            }
        },
        watch: {
            js: { files: ['app/main/*.js', 'app/main/controllers/*.js', 'app/main/services/*.js', 'app/js/stomp.min.js'], tasks: ['uglify'] },
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // register at least this one task
    grunt.registerTask('default', ['concat', 'uglify', 'compress']);
    // grunt.registerMultiTask(taskName, [description, ] taskFunction);


};