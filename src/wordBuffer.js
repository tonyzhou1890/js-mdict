import util from './utils'

/**
 * wordBuffer
 * 用五个字节（1xxxxxxx形式存放）存放单词偏移量，接下来五个字节存放结束偏移量（源字典里下个单词偏移量），然后存放单词，再空置一个字节作为分隔符，如此往复。
 * 因为 0x00 是非法的 unicode 字符，所以可以通过 0 分割存储区
 */
export class WordBuffer {
  constructor(blockSize = 1_000_000, ruleKeyFn) {
    // buffer 初始容量
    this.blockSize = blockSize
    // 数值字节数
    this.numberSize = 5
    if (typeof ruleKeyFn !== 'function') ruleKeyFn = (v) => v
    this.ruleKeyFn = ruleKeyFn
    this.buffer = new Uint8Array(blockSize)
    this.blockIndex = 0
  }

  /**
   * 插入 str
   * @param {string} str 字符
   * @param {number} offset 字符对应的释义偏移量
   * @param {number} nextRecordStartOffset 源词典中下个单词开始位置
   * @returns 
   */
  insert(str, offset, nextRecordStartOffset) {
    // str 占用字节数按照四字节字符估计，如果超过剩余空间，扩容
    if ((str.length * 4) > (this.buffer.length - this.blockIndex - this.numberSize * 2)) {
      const newBuffer = new Uint8Array(this.buffer.length + this.blockSize)
      newBuffer.set(this.buffer)
      this.buffer = newBuffer
      return this.insert(str, offset)
    }

    const startOffset = this.blockIndex

    // 开始偏移量
    util.numToUint8(offset, this.buffer, this.blockIndex)
    this.blockIndex += this.numberSize
    // 结束偏移量
    util.numToUint8(nextRecordStartOffset, this.buffer, this.blockIndex)
    this.blockIndex += this.numberSize

    this.blockIndex = util.textEncode(str, this.buffer, this.blockIndex)
    // 空一格作为分隔符（0）
    this.blockIndex++

    return startOffset
  }

  /**
   * 查找
   * @param {number} offset 
   * @returns []
   */
  lookup(offset) {
    let res = {
      recordStartOffset: util.uint8ToNum(this.buffer, offset),
      nextRecordStartOffset: util.uint8ToNum(this.buffer, offset + this.numberSize),
      keyText: ''
    }
    offset += this.numberSize * 2

    let start = offset
    while (this.buffer[offset]) {
      offset++
    }

    res.keyText = util.textDecode(this.buffer, start, offset - start)
    console.log('res: ', res)
    return res
  }

  // 根据存储区偏移获取字符串
  _getStrByOffset(offset) {
    if (offset > this.blockIndex) return ''
    // 跳过偏移数字
    offset += this.numberSize * 2
    let start = offset
    while (this.buffer[offset]) {
      offset++
    }
    // console.log(start, offset, util.textDecode(this.buffer, start, offset - start))
    return util.textDecode(this.buffer, start, offset - start)
  }

  // 二分搜索字符串
  lookupByStr(str) {
    if (this.blockIndex === 0) return

    let tStr = this.ruleKeyFn(str)
    let left = 0
    let right = this.blockIndex
    // blockIndex 是存储区的末尾，需要将 right 修正到最后一个存储区的开始
    while (this.buffer[right - 1]) right--
    if (right <= 0) right = 0

    while (left < right) {
      let mid = Math.floor(left / 2 + right / 2)
      // mid 可能在一个字符串（包括偏移数字）的存储区，需要修正为一个存储区的开始。
      // 不用 this.buffer[mid - 1] 判断是因为 mid 也可能正好在分隔符，这种情况是不需要 mid-- 的。
      while (this.buffer[mid]) mid--
      mid++
      /** 
       * 因为 left 和 right 都是存储区的开始位置，mid 也是通过 floor 处理然后修正到存储区开始位置的的。
       * 所以有这么一种可能，mid 和 left 相等，同时 left 和 right 之间存在多个存储区——left 存储区很长，left 之后的存储区很短。
       * 因此，当 mid 等于 left 的时候，直接遍历 left 和 right 这个范围的所有单词。 
       **/
      if (mid === left) {
        while (left < right) {
          let leftStr = this.ruleKeyFn(this._getStrByOffset(left))
          if (leftStr === tStr) return this.lookup(left)
          if (leftStr > tStr) return
          // left 移动到下一个存储区
          while (this.buffer[left]) left++
          left++
        }
        return
      }
      let midStr = this.ruleKeyFn(this._getStrByOffset(mid))
      if (tStr < midStr) {
        right = mid
      } else if (tStr > midStr) {
        left = mid
      } else {
        return this.lookup(mid)
      }
    }
    // 最后判断 left
    let leftStr = this.ruleKeyFn(this._getStrByOffset(left))
    if (leftStr === tStr) return this.lookup(left)
    return
  }

  /**
   * 词表
   */
  keys() {
    const keys = []
    let index = this.numberSize * 2
    while (index < this.blockIndex) {
      let start = index
      while (this.buffer[index]) {
        index++
      }
      keys.push(util.textDecode(this.buffer, start, index - start))
      // 跳过偏移数字
      index += this.numberSize * 2 + 1
    }
    return keys
  }
}