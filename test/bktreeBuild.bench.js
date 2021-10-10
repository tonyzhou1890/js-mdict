import { expect } from 'chai';
import Mdict from '../src/mdict';
import BKTree from '../src/bktree';

/**
 * 
 * @param {*} dictName dictionary name
 * @param {*} dictPath dictionary path
 * @param {*} func callback function
 * average load time:0.0124 s
 * average decode time:2.1612 s
 */
function recorder(dictName, dictPath, func) {
  const startTime = new Date().getTime();
  const mdict = new Mdict(dictPath);
  const endTime = new Date().getTime();
  const loadTime = endTime - startTime;
  const startDecodeTime = new Date().getTime();
  const words = mdict.rangeKeyWords();
  const endDecodeTime = new Date().getTime();
  const decodeKeyBlockTime = endDecodeTime - startDecodeTime;

  const startBuildTime = new Date().getTime();
  const bktree = new BKTree(words.length);
  bktree.add(words.map(item => item.keyText));
  const endBuiltTime = new Date().getTime();
  const buildTreeTime = endBuiltTime - startBuildTime;

  func(mdict, loadTime, decodeKeyBlockTime, buildTreeTime, words);
  console.log(`loading ${dictName} dict used: ${loadTime / 1000.0} s, decode Keyblock ${decodeKeyBlockTime/1000.0} s, build bk-tree use ${buildTreeTime/1000/0} s`);
}

const totalTime = [];
const totalDecodeTime = [];
const totalBuildTime = [];

for (let i = 0; i < 10; i++) {
  recorder('oale8', 'mdx/testdict/oale8.mdx', (mdict, elapsedTime, decodeTime, treeBuildTime, words) => {
    totalTime.push(elapsedTime);
    totalDecodeTime.push(decodeTime);
    totalBuildTime.push(decodeTime);
    console.log(`oale8@mdx/testdict/oale8.mdx:(${words.length})`);
    expect(mdict._version).to.be.equal(2);
  });
}
const avgTime = totalTime.reduce((prev, cur) => prev + cur) / totalTime.length;
const avgDecodeTime = totalDecodeTime.reduce((prev, cur) => prev + cur) / totalDecodeTime.length;
const avgBuildTime = totalBuildTime.reduce((prev, cur) => prev + cur) / totalBuildTime.length;
console.log(`average load time:${avgTime / 1000.0} s`);
console.log(`average decode time:${avgDecodeTime / 1000.0} s`);
console.log(`average decode time:${avgBuildTime / 1000.0} s`);
