import Mdict from '../src/mdict';
import fs from 'fs'

const mdict = new Mdict('mdx/testdict/dict-01-袖珍葡汉汉葡词典(简体版).mdx');
// const mdict = new Mdict('mdx/testdict/dict-03-ptDict_KeyCaseSensitive.mdx')

// console.log(mdict)
console.log(mdict.lookup('Holanda'))

const keysStr = mdict.keys().join('\r\n')
fs.writeFile('./keys.txt', keysStr, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('write success')
  }
})