module.exports = function (grunt) {

    grunt.initConfig({
        meta: {
            banner:
                '/*'+
                'Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.\r\n' +
                'Microsoft Open Technologies would like to thank its contributors, a list.\r\n' +
                'of whom are at http://aspnetwebstack.codeplex.com/wikipage?title=Contributors..\r\n' +
                'Licensed under the Apache License, Version 2.0 (the "License"); you.\r\n' +
                'may not use this file except in compliance with the License. You may.\r\n' +
                'obtain a copy of the License at.\r\n\r\n' +
                'http://www.apache.org/licenses/LICENSE-2.0.\r\n\r\n' +
                'Unless required by applicable law or agreed to in writing, software.\r\n' +
                'distributed under the License is distributed on an "AS IS" BASIS,.\r\n' +
                'WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or.\r\n' +
                'implied. See the License for the specific language governing permissions.\r\n' +
                'and limitations under the License..\r\n' +
                '*/'
        },
        concat: {
            options: {
                separator: ''
            },
            basic: {
                src: [
                    'src/license.js',
                    'src/intro.js',
                    'src/basicheader.js',
                    'src/polyfills',
                    'src/rx-jquery.js',
                    'src/outro.js'
                ],
                dest: 'rx.jquery.js'
            }
        },
        uglify: {
            basic: {
                src: ['<banner>', 'rx.jquery.js'],
                dest: 'rx.jquery.min.js'
            }

        },
        qunit: {
            all: ['tests/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Default task(s).
    grunt.registerTask('default', ['concat:basic', 'uglify:basic']);

};