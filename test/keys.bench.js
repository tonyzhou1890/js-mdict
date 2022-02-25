import { Benchmark } from 'benchmark';

import Mdict from '../src/mdict';

import fs from 'fs'

const suite = new Benchmark.Suite();

// loading dictionary
const startTime = new Date().getSeconds();
// const mdict = new Mdict('mdx/testdict/oale8.mdx', { mode: 'mixed' });
// const mdict = new Mdict('mdx/testdict/朗文当代英语大词典(英汉汉英)第4版.mdx', { mode: 'mixed' });
// const mdict = new Mdict('mdx/testdict/简明英汉汉英词典.mdx', { mode: 'mixed' });
// const mdict = new Mdict('mdx/testdict/[英-汉] 新东方词根词缀词典(應网友要求)[12120](090528).mdx', { mode: 'mixed' })
const mdict = new Mdict('mdx/testdict/[英-汉] 《词根记忆词典》[12060](090529).mdx', { mode: 'mixed' })
const endTime = new Date().getSeconds();
// eslint-disable-next-line
console.log(`Mdict#loading time: ${endTime - startTime} sec`);

// 结果词表
let keys = []

// add tests
suite
  .add('Mdict#keys', () => {
    keys = mdict.keys()
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
    const keysStr = keys.join('\r\n')
    fs.writeFile('./keys.txt', keysStr, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('write success')
      }
    })
  })
  // run async
  .run({ async: true });
