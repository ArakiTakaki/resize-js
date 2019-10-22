import sharp = require('sharp');

/**
 * リサイズライブラリ
 */
export interface IResizeOpts {
  debug?: boolean;
  extension: TOutputExtension;
  maxWidth?: number;
  maxHeight?: number;
};

export type TOutputExtension = 'jpeg' | 'png' | 'webp' | 'tiff';

/**
 * @param targetImage - 対象のイメージファイル
 * @param outputImage - 出力イメージ
 * @return void
 */
export const resize = (
  targetImage: string,
  outputImage: string,
  opts: IResizeOpts,
) => {
  const { debug, extension, maxHeight, maxWidth } = opts;
  const image = sharp(targetImage);

  image.resize(maxWidth, maxHeight);
  image[extension]();
  image.toFile(outputImage, (err, info) => {
    if (err != null) throw err;
    console.log(info);
  });
}


