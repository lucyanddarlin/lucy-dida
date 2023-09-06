/**
 * 判断参数是否为空
 */
export const isNull = (obj: any): boolean => {
  if (obj === null || obj === undefined) {
    return true
  }
  return ['{}', '[]'].includes(JSON.stringify(obj))
}
