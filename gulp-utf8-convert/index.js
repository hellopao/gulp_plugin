var path = require('path');

var gutil = require('gulp-util');
var through = require('through2');
var isUtf8 = require('is-utf8');
var iconv = require('iconv-lite');
var jschardet = require('jschardet');

var PLUGIN_NAME = 'gulp-utf8-convert';

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

        var fileName = file.path.split(path.sep).pop();

		if (!isUtf8(file.contents)) {
			try {
                var encInfo = jschardet.detect(file.contents);
                gutil.log(gutil.colors.red('[WARN] file ' + fileName + ' is not encoded in utf-8, it may be encoded in ' + encInfo.encoding));

                //notify
                options.encNotMatchHandle && options.encNotMatchHandle(file.path);

				var content = iconv.decode(file.contents,encInfo.encoding);
				file.contents = iconv.encode(content,"utf8");
			} catch(e) {
                gutil.log('convert encoding to utf8 failed : ' + e);
			}

			this.push(file);
		}

		cb();
	});
};

