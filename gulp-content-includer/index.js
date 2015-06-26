var path = require('path');
var util = require('util');


var gutil = require('gulp-util');
var through = require('through2');
var Promise = require('bluebird');
var guid = require('guid');


var PLUGIN_NAME = 'gulp-content-includer';

module.exports = function(options) {
    return through.obj(function(file, enc, cb) {
        var self = this;

        options = options || {};

        var showLog = options.showLog;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        var includerReg = options.includerReg;

        if (!util.isRegExp(includerReg)) {
            gutil.log(gutil.colors.red('[ERROR] includerReg is required'));
            this.push(file);
            return cb();
        }

        var content = file.contents.toString();

        var promises = [];

        try {
            content = content.replace(includerReg, function(str, includeSrc) {
                var fs = Promise.promisifyAll(require('fs'));

                var tempKey = guid.raw();

                includeSrc = path.join(options.baseSrc || "", includeSrc);
                var promise = fs.readFileAsync(includeSrc)
                    .then(function(data) {
                        return {
                            key: tempKey,
                            value: data.toString()
                        };
                    })
                    .catch(function(e) {
                        showLog && gutil.log(gutil.colors.red('[ERROR] read include file failed, ' + e));
                    });

                promises.push(promise);

                return tempKey;
            });
        } catch (err) {
            showLog && gutil.log(gutil.colors.red('[ERROR] replace include failed, ' + e));
        }

        Promise.all(promises)
            .then(function(map) {
                map.forEach(function(obj) {
                    content = content.replace(obj.key, obj.value);
                });

                file.contents = new Buffer(content);
                self.push(file);
                cb();
            })
            .catch(function(e) {
                gutil.log(gutil.colors.red('[ERROR] concat file failed, ' + e));
                self.push(file);
                cb();
            });
    });
};
