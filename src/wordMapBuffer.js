// wordMapBuffer
export class WordMapBuffer {
  constructor(blockSize = 1_000_000) {
    this.blockSize = blockSize
    this.map = {}
    this.bufferList = []
    this.blockIndex = 0
  }

  insert(key, str, offset) {
    const arr = [...str]
    if (arr.length > this.blockSize - 1) {
      return -1
    }

    // 添加到 buffer
    if (this.bufferList.length === 0 || arr.length > (this.blockSize - this.blockIndex - 1)) {
      this.bufferList.push(new Uint32Array(this.blockSize))
      this.blockIndex = 0
    }
    const buffer = this.bufferList[this.bufferList.length - 1]
    const startOffset = this.blockIndex + (this.bufferList.length - 1) * this.blockSize
    buffer[this.blockIndex++] = offset
    for (let i = 0; i < arr.length; i++) {
      buffer[this.blockIndex++] = arr[i].codePointAt(0)
    }
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
        recordStartOffset: buffer[blockIndex++],
        keyText: ''
      }
      while (buffer[blockIndex]) {
        keyInfo.keyText += String.fromCodePoint(buffer[blockIndex++])
      }
      if (buffer[blockIndex + 1]) {
        keyInfo.nextRecordStartOffset = buffer[blockIndex + 1]
      } else {
        if (this.bufferList[bufferIndex + 1]) {
          keyInfo.nextRecordStartOffset = this.bufferList[bufferIndex + 1][0]
        }
      }

      res.push(keyInfo)
    }

    return res
  }
}