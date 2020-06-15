//去左右空格;
export function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}
/**
* 是否是图片格式
* @param {*} type 文件类型
*/
export function isImgFile(type) {
  let result = type.startsWith("image/");
  return result;
}
/**
* 图片大小是否超出限制
* @param {*} size 图片大小
* @param {*} maxMb 图片大小显示 单位M
*/
export function imgSize(size, maxMb) {
  let maxSize = maxMb || 10;
  const isSizeOk = size / 1024 / 1024 < maxSize;
  return isSizeOk;
}