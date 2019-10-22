import * as path from 'path';

/**
 * ファイル名を変更するメソッド
 */
export default class FileNameParser {
  private fullName: string;

  constructor(fileName: string) {
    this.fullName = fileName;
    return this;
  }

  public getFullName() {
    return this.fullName;
  }

  public setFullName(fileName: string) {
    this.fullName = fileName;
    return this;
  }

  public getExtName() {
    return path.extname(this.fullName);
  }

  public setExtName(extName: string) {
    this.fullName = this.getFileName()
      + '.'
      + extName;
    return this;
  }

  public getFileName() {
    return path.basename(this.fullName, this.getExtName());
  }

  public setFileName(fileName: string) {
    this.fullName = fileName + this.getExtName();
    return this;
  }
}
