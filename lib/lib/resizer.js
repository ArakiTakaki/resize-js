"use strict";
exports.__esModule = true;
var sharp = require("sharp");
;
/**
 * @param targetImage - 対象のイメージファイル
 * @param outputImage - 出力イメージ
 * @return void
 */
exports.resize = function (targetImage, outputImage, opts) {
    var debug = opts.debug, extension = opts.extension, maxHeight = opts.maxHeight, maxWidth = opts.maxWidth;
    var image = sharp(targetImage);
    image.resize(maxWidth, maxHeight);
    image[extension]();
    image.toFile(outputImage, function (err, info) {
        if (err != null)
            throw err;
        console.log(info);
    });
};
