"use strict";

var crypto = require('crypto');

var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-rev-files';

var createHash = function (file,len) {
    return crypto.createHash('md5').update(file).digest('hex').substr(0,len);
};

module.exports = function(options) {
	return through.obj(function(file, enc, cb) {

        options = options || {};

		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return cb();
		}

		var hash = createHash(file.contents,options.hashLen || 7);
		
		file.path = file.path.replace(/(\.[^\.]+)$/,(options.verConnecter || "-") + hash + "$1");

        this.push(file);
		cb();
	});
};

