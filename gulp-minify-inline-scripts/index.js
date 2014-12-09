
var path = require('path');

var gutil = require('gulp-util');
var uglify = require('uglify-js');
var through = require('through2');

var PLUGIN_NAME = 'gulp-minify-inline-scripts';

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        var self = this;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        var fileName = file.path.split(path.sep).pop();

        //html file only
        if (!/^\.html?$/.test(path.extname(file.path))) {
            gutil.log(gutil.colors.red('[WARN] file ' + fileName + ' is not a html file'));
            this.push(file);
            return cb();
        }

        gutil.log("uglify inline scripts in html file: " + file.path);

        var html = file.contents.toString('utf8');
        var reg = /(<script(?![^>]*?\b(type=['"]text\/template['"]|src=["']))[^>]*?>)([\s\S]*?)<\/script>/g;

        
        html = html.replace(reg, function (str, tagStart,attr, script) {
            try {
                var result = uglify.minify(script, { fromString: true });
                return tagStart + result.code + '</script>';
            } catch (e) {
                self.emit('error', new gutil.PluginError(PLUGIN_NAME, 'uglify inline scripts error: ' + (e && e.stack)));
            }
        });
        

        file.contents = new Buffer(html);
        this.push(file);
        cb();
    });
};
