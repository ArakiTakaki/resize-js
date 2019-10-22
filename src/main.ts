import errors = require('./constants/errors');
import commander = require('commander');
import * as resizer from './lib/resizer';
import FileNameParser from './lib/FileNameParser';

class Cli extends commander.Command {
  public debug?: boolean;
  public target?: string;
  public output?: string;
  public width?: number;
  public height?: number;
  public extension?: resizer.TOutputExtension;
}

const main = () => {
  const program: Cli = commander
    .version('1.0.0') // TODO - package.jsonから読み込む
    .usage('[options]')
    .option('-d --debug', 'デバッグモード', false)
    .option('-t --target <filename>', 'エントリーファイル')
    .option('-o --output <filename>', '出力ファイル')
    .option('-w --width <px>', 'リサイズ後のサイズ', parseInt)
    .option('-h --height <px>', 'リサイズ後のサイズ', parseInt)
    .option('-e --extension <extension>', '変換ファイル')
    .parse(process.argv);

  if (program.debug) console.log(program.opts());
  if (program.target == null) throw new Error(errors.inputFileNotFoundException('入力されていません'));
  if (program.extension != null && !/[jpeg|png|webp|tiff]/.test(program.extension)) throw new Error(errors.inputFileNotFoundException('[jpeg|png|webp|tiff]'));

  const targetFile = new FileNameParser(program.target);
  const outputFile = program.output == null ? new FileNameParser(program.target) : new FileNameParser(program.output);

  const options: resizer.IResizeOpts = {
    extension: program.extension || 'jpeg',
    maxWidth: program.width,
    maxHeight: program.height,
  };
  outputFile.setExtName(options.extension);
  resizer.resize(targetFile.getFullName(), outputFile.getFullName(), options);
}

main();

