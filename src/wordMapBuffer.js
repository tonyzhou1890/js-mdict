import util from './utils'

// wordMapBuffer
export class WordMapBuffer {
  constructor(blockSize = 1_000_000) {
    this.blockSize = blockSize
    this.map = {}
    this.bufferList = []
    this.blockIndex = 0
  }

  insert(key, str, offset) {
    if ((str.length * 4) > this.blockSize - 1) {
      return -1
    }

    // 添加到 buffer
    if (this.bufferList.length === 0 || (str.length * 4) > (this.blockSize - this.blockIndex - 1)) {
      this.bufferList.push(new Uint8Array(this.blockSize))
      this.blockIndex = 0
    }
    const buffer = this.bufferList[this.bufferList.length - 1]
    const startOffset = this.blockIndex + (this.bufferList.length - 1) * this.blockSize

    util.numToUint8(offset, buffer, this.blockIndex)
    this.blockIndex += 4

    this.blockIndex = util.textEncode(str, buffer, this.blockIndex)
    // 空一格作为分隔符（0）
    this.blockIndex++

    // 将 key 添加到 map
    if (this.map[key]) {
      if (Array.isArray(this.map[key])) {
        this.map[key].push(startOffset)
      } else {
        this.map[key] = [this.map[key], startOffset]
      }
    } else {
      this.map[key] = startOffset
    }

    return startOffset
  }

  lookup(key) {
    const res = []
    let offsetList = this.map[key]
    if (!Array.isArray(offsetList)) {
      offsetList = [offsetList]
    }

    for (let i = 0; i < offsetList.length; i++) {
      const offset = offsetList[i]
      const bufferIndex = Math.floor(offset / this.blockSize)
      const buffer = this.bufferList[bufferIndex]
      if (!buffer) continue

      let blockIndex = offset % this.blockSize
      let keyInfo = {
        recordStartOffset: util.uint8ToNum(buffer, blockIndex),
        keyText: ''
      }
      blockIndex += 4

      const start = blockIndex
      while (buffer[blockIndex]) {
        blockIndex++
      }
      keyInfo.keyText = util.textDecode(buffer, start, blockIndex - start)
      // 跳过偏移数字，判断接下来有没有字符转的 uint8
      if (buffer[blockIndex + 5]) {
        keyInfo.nextRecordStartOffset = util.uint8ToNum(buffer, blockIndex + 1)
      } else {
        if (this.bufferList[bufferIndex + 1]) {
          keyInfo.nextRecordStartOffset = util.uint8ToNum(this.bufferList[bufferIndex + 1])
        }
      }

      res.push(keyInfo)
    }

    return res
  }
}