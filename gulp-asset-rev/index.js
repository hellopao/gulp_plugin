"use strict";

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-asset-rev';

var ASSET_REG = {
    "SCRIPT" : /(<script[^>]+src=)['"]([^'"]+)["']/ig,
    "STYLESHEET" : /(<link[^>]+href=)['"]([^'"]+)["']/ig,
    "IMAGE" : /(<img[^>]+src=)['"]([^'"]+)["']/ig,
    "BACKGROUND" : /(url\()(?!data:|http:|about:)([^)]*)/ig
};

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

        var content = file.contents.toString();

        var filePath = path.dirname(file.path);

        for (var type in ASSET_REG) {
            content = content.replace(ASSET_REG[type],function (str,tag,src) {
                src = src.replace(/\?[\s\S]+$/,'').replace(/(^['"]|['"]$)/g,'');
                
                if (options.verStr) {
                    src += options.verStr;
                    return tag + '"' + src + '"';
                }
                
                var assetPath = path.join(filePath,src);
                
                if (src.indexOf('/') == 0) {
                    assetPath = (options.rootPath || "") + src;
                }

                if (fs.existsSync(assetPath)) {

                    var buf = fs.readFileSync(assetPath);

                    var md5 = createHash(buf,options.hashLen || 7);
                    
                    var verStr = (options.verConnecter || "-") + md5;
                    
                    src = src.replace(verStr,'').replace(/(\.[^\.]+)$/, verStr + "$1");
                } else {
                    return str;
                }
                
                return tag + '"' + src + '"';
            });
        }

        file.contents = new Buffer(content);
        this.push(file);
		cb();
	});
};

