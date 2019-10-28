#### Qly_SV_client
#### Cần cài sẵn npm, node, bower
#### Cài npm, nodejs tự tìm

####package.json

    "grunt": "~0.4.2",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-uglify": "git://github.com/gruntjs/grunt-contrib-uglify.git#harmony",
    "grunt-contrib-watch": "~0.5.3",

sudo npm install -g grunt-cli
npm install git://github.com/gruntjs/grunt-contrib-uglify.git#harmony --save-dev
 npm install grunt-contrib-concat --save-dev

#### gruntfile.js ở cùng folder với package.json
 module.exports = function(grunt) {
    grunt.initConfig({

        // define source files and their destinations
        concat: {
            js: {
                src: ['app/main/*.js', 'app/main/controllers/*.js', 'app/main/services/*.js', 'app/js/stomp.min.js'],
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
        watch: {
            js: { files: ['app/main/*.js', 'app/main/controllers/*.js', 'app/main/services/*.js', 'app/js/stomp.min.js'], tasks: ['uglify'] },
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // register at least this one task
    grunt.registerTask('default', ['concat', 'uglify']);
    // grunt.registerMultiTask(taskName, [description, ] taskFunction);


};

#### bỏ http-server trong package.json
#### cài thêm cái sau npm install skleeschulte/http-server --save
#### bỏ hết các dòng trong package.json chỉ giữ lại như sau
#{
  "name": "angular-seed",
  "private": true,
  "version": "0.0.0",
  "description": "A starter project for AngularJS",
  "repository": "https://github.com/angular/angular-seed",
  "license": "MIT",
  "devDependencies": {
    "grunt": "~0.4.2",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-uglify": "git://github.com/gruntjs/grunt-contrib-uglify.git#harmony",
    "grunt-contrib-watch": "~0.5.3",
    "jasmine-core": "^2.4.1"
  },
  "scripts": {
    "start": "http-server -a localhost -p 8000 -c-1 ./app -f /index.html"
  },
  "dependencies": {
    "http-server": "github:skleeschulte/http-server"
  }
}


#### sử dụng như trên vì lý do bỏ dấu # trong url, bật html5mode trong app.js vì vậy khi url là tên thư mục
#### thì web sẽ load thư mục, khi sửa lại code, nếu là thư mục thì redirect về index
# -i false -d false để không bị load folder

#### Sau khi download về thì gõ các lệnh sau
#  bower install
#### Trong khi cài, nó sẽ hỏi chọn bản angular nào thì chọn bản mới nhất
#### Nếu chưa có bower thì gõ
#  npm install -g bower
#### Sau đó gõ lệnh sau để cài các gói cần thiết. 
#  bower install
#### Nếu có lỗi báo là chưa có thư mục bower_components thì tạo thư mục bower_components trong thư mục app
#### Sau khi cài xong, ấn lệnh sau để chạy
#  npm start
