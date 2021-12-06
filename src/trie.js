/**
 * Trie
 * save wordList
 * ```
 * TrieNode: {
 *   a: {
 *     data: [keyInfo],
 *     children: TrieNode
 *   }
 * }
 * ```
 */
export class Trie {
  constructor() {
    this.trie = {}
  }

  insert(str, data) {
    const arr = [...str]
    let node = this.trie
    for (let i = 0; i < arr.length; i++) {
      if (!node[arr[i]]) {
        node[arr[i]] = {
          data: [],
          children: {}
        }
      }
      if (i === arr.length - 1) {
        node[arr[i]].data.push(data)
      } else {
        node = node[arr[i]].children
      }
    }
  }

  lookup(str) {
    const arr = [...str]
    let node = this.trie
    for (let i = 0; i < arr.length; i++) {
      if (!node[arr[i]]) {
        return null
      }
      if (i === arr.length - 1) {
        return [...node[arr[i]].data]
      } else {
        node = node[arr[i]].children
      }
    }
  }
}