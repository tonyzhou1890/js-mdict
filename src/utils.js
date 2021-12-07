/**
 * print time of function
 * @param {string} name 
 * @param {function} fn 
 * @param  {...any} rest 
 * @returns any
 */
function measureTime(name, fn, ...rest) {
  const start = Date.now()
  let res = fn(...rest)
  console.log(`${name}: ${Date.now() - start}ms`)
  return res
}

/**
 * 打印内存占用
 */
function consoleMem(name = '') {
  const used = process.memoryUsage();
  if (name) {
    console.log(`mem of ${name}`)
  }
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
}

/**
 * 字符串转 buffer
 */
function strToUint32(str) {
  const arr = [...str]
  const bf = new Uint32Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
    bf[i] = arr[i].codePointAt(0)
  }
  return bf
}

function uint32ToStr(bf, start, length) {
  let str = ''
  for (let i = 0; i < length; i++) {
    str += String.fromCodePoint(bf[start + i])
  }
  return str
}

export default {
  measureTime,
  consoleMem,
  strToUint32,
  uint32ToStr
}