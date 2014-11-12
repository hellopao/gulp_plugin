var path = require('path');

var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-require-tpl2js';

module.exports = function(options) {
	return through.obj(function(file, enc, cb) {
		var self = this;

        options = options || {};

		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return cb();
		}

        var defaultExtNames = [".html",".tpl"];
        var fileExtname = path.extname(file.path);

        if (defaultExtNames.indexOf(fileExtname) > -1 || (options.extname && options.extname.replace(/^\.?/,'.') === fileExtname)) {
            try {
                var tpl = file.contents.toString();
                var lines = tpl.replace(/^\s*$/gm,'').split(/\r?\n/);
                
                for (var i = 0; i < lines.length; i++) {
                    lines[i] = lines[i].replace(/'/g,'\\\'').replace(/^(\s*)/g,'\t$1\'').replace(/(\s)*$/,'\'$1');
                }

                tpl = ';define(function(){\r\n\t return ' +  '[\r\n\t' + lines.join(",\r\n\t") + '\r\n\t].join("");\r\n});';
            } catch (err) {
                
            }

            file.contents = new Buffer(tpl);
        }
        

        this.push(file);
		cb();
	});
};

