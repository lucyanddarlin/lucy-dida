/**
 * 判断参数是否为空字符串
 * @param val
 */
export const isEmptyString = (val: any): boolean => {
  if (!val || val === '') {
    return true
  }
  return false
}
