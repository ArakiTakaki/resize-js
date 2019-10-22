"use strict";
exports.__esModule = true;
var path = require("path");
/**
 * ファイル名を変更するメソッド
 */
var FileNameParser = /** @class */ (function () {
    function FileNameParser(fileName) {
        this.fullName = fileName;
        return this;
    }
    FileNameParser.prototype.getFullName = function () {
        return this.fullName;
    };
    FileNameParser.prototype.setFullName = function (fileName) {
        this.fullName = fileName;
        return this;
    };
    FileNameParser.prototype.getExtName = function () {
        return path.extname(this.fullName);
    };
    FileNameParser.prototype.setExtName = function (extName) {
        this.fullName = this.getFileName()
            + '.'
            + extName;
        return this;
    };
    FileNameParser.prototype.getFileName = function () {
        return path.basename(this.fullName, this.getExtName());
    };
    FileNameParser.prototype.setFileName = function (fileName) {
        this.fullName = fileName + this.getExtName();
        return this;
    };
    return FileNameParser;
}());
exports["default"] = FileNameParser;
