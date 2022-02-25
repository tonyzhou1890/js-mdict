import { Benchmark } from 'benchmark';

import Mdict from '../src/mdict';

import fs from 'fs'

const suite = new Benchmark.Suite();

// loading dictionary
const startTime = new Date().getSeconds();
// const mdict = new Mdict('mdx/testdict/oale8.mdx', { mode: 'mixed' });
// const mdict = new Mdict('mdx/testdict/朗文当代英语大词典(英汉汉英)第4版.mdx', { mode: 'mixed' });
// const mdict = new Mdict('mdx/testdict/简明英汉汉英词典.mdx', { mode: 'mixed' });
const mdict = new Mdict('mdx/testdict/[英-汉] 新东方词根词缀词典(應网友要求)[12120](090528).mdx', { mode: 'mixed' })
const endTime = new Date().getSeconds();
// eslint-disable-next-line
console.log(`Mdict#loading time: ${endTime - startTime} sec`);

// 结果词表
let keys = []
let entries = []

// add tests
suite
  .add('Mdict#keys', () => {
    keys = mdict.keys()
  })
  .add('Mdict#entries', () => {
    const temp = []
    for (let i = 0; i < keys.length; i++) {
      const res = mdict.lookup(keys[i])
      if (res[0]?.definition) {
        temp.push(res[0].definition)
      }
    }
    entries = temp
  })
  // add listeners
  .on('cycle', (event) => {
    // eslint-disable-next-line no-console
    console.log(String(event.target));
  })
  .on('complete', function cb() {
    const used = process.memoryUsage();
    for (let key in used) {
      // eslint-disable-next-line no-console
      console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
    const entriesStr = `
      <!DOCTYPE html>
      <html lang="">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1">
          <title>entries</title>
        </head>
        <body>
          ${entries.join('\r\n')}
        </body>
      </html>
    `
    fs.writeFile('./entries.html', entriesStr, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('write success')
      }
    })
  })
  // run async
  .run({ async: true });
