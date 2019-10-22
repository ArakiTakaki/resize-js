"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var errors = require("./constants/errors");
var commander = require("commander");
var resizer = require("./lib/resizer");
var FileNameParser_1 = require("./lib/FileNameParser");
var Cli = /** @class */ (function (_super) {
    __extends(Cli, _super);
    function Cli() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cli;
}(commander.Command));
var main = function () {
    var program = commander
        .version('1.0.0') // TODO - package.jsonから読み込む
        .usage('[options]')
        .option('-d --debug', 'デバッグモード', false)
        .option('-t --target <filename>', 'エントリーファイル')
        .option('-o --output <filename>', '出力ファイル')
        .option('-w --width <px>', 'リサイズ後のサイズ', parseInt)
        .option('-h --height <px>', 'リサイズ後のサイズ', parseInt)
        .option('-e --extension <extension>', '変換ファイル')
        .parse(process.argv);
    if (program.debug)
        console.log(program.opts());
    if (program.target == null)
        throw new Error(errors.inputFileNotFoundException('入力されていません'));
    if (program.extension != null && !/[jpeg|png|webp|tiff]/.test(program.extension))
        throw new Error(errors.inputFileNotFoundException('[jpeg|png|webp|tiff]'));
    var targetFile = new FileNameParser_1["default"](program.target);
    var outputFile = program.output == null ? new FileNameParser_1["default"](program.target) : new FileNameParser_1["default"](program.output);
    var options = {
        extension: program.extension || 'jpeg',
        maxWidth: program.width,
        maxHeight: program.height
    };
    outputFile.setExtName(options.extension);
    resizer.resize(targetFile.getFullName(), outputFile.getFullName(), options);
};
main();
