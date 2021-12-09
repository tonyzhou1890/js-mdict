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

/**
 * 字符串转 uint8
 * @param {string} str 
 * @param {Uint8Array} buffer 
 * @param {number} offset 
 * @returns {number} offset
 */
function textEncode(str, buffer, offset = 0) {
  const arr = [...str]
  let index = offset
  for (let i = 0; i < arr.length; i++) {
    const codePoint = arr[i].codePointAt(0)
    // 四字节字符
    if (codePoint >= 0x10000) {
      buffer[index++] = (codePoint >> 18) & 0x7 | 0xf0
      buffer[index++] = (codePoint >> 12) & 0x3f | 0x80
      buffer[index++] = (codePoint >> 6) & 0x3f | 0x80
      buffer[index++] = codePoint & 0x3f | 0x80
    } else if (codePoint >= 0x800) {
      // 三字节字符
      buffer[index++] = (codePoint >> 12) & 0xf | 0xe0
      buffer[index++] = (codePoint >> 6) & 0x3f | 0x80
      buffer[index++] = codePoint & 0x3f | 0x80
    } else if (codePoint >= 0x80) {
      // 两字节字符
      buffer[index++] = (codePoint >> 6) & 0x1f | 0xc0
      buffer[index++] = codePoint & 0x3f | 0x80
    } else {
      // 单字节字符
      buffer[index++] = codePoint
    }
  }
  return index
}

/**
 * uint8 转字符串
 * @param {Uint8Array} buffer 
 * @param {number} offset 
 * @param {number} length 
 * @returns 
 */
function textDecode(buffer, offset, length) {
  let str = ''
  for (let i = offset; i < offset + length; i++) {
    switch (buffer[i] >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        str += String.fromCodePoint(buffer[i])
        break
      case 12: case 13:
        str += String.fromCodePoint(
          ((buffer[i] & 0x1f) << 6) +
          (buffer[i + 1] & 0x3f)
        )
        i++
        break
      case 14:
        str += String.fromCodePoint(
          ((buffer[i] & 0xf) << 12) +
          ((buffer[i + 1] & 0x3f) << 6) +
          (buffer[i + 2] & 0x3f)
        )
        i += 2
        break
      case 15:
        str += String.fromCodePoint(
          ((buffer[i] & 0x7) << 18) +
          ((buffer[i + 1] & 0x3f) << 12) +
          ((buffer[i + 2] & 0x3f) << 6) +
          (buffer[i + 3] & 0x3f)
        )
        i += 3
        break
    }
  }
  return str
}

/**
 * 数字转 uint8
 * @param {*} num 
 * @param {*} buffer 
 * @param {*} offset 
 * @returns 
 */
function numToUint8(num, buffer = new Uint8Array(4), offset = 0) {
  buffer[offset] = (num >> 24) & 0xff
  buffer[offset + 1] = (num >> 16) & 0xff
  buffer[offset + 2] = (num >> 8) & 0xff
  buffer[offset + 3] = (num) & 0xff
  return buffer
}

/**
 * uint8 转数字
 * @param {*} buffer 
 * @param {*} offset 
 * @returns 
 */
function uint8ToNum(buffer, offset = 0) {
  return (
    (buffer[offset] << 24) +
    (buffer[offset + 1] << 16) +
    (buffer[offset + 2] << 8) +
    (buffer[offset + 3])
  )
}

export default {
  measureTime,
  consoleMem,
  strToUint32,
  uint32ToStr,
  textEncode,
  textDecode,
  uint8ToNum,
  numToUint8
}