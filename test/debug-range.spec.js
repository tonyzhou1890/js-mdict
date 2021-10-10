import { expect, assert } from 'chai';

import Mdict from '../src/mdict';
import Sorter from '../src/sorter';
import Seacher from '../src/seacher';
import IndexBuilder from '../src/index-builder';

function recorder(dictName, dictPath, func) {
  const startTime = new Date().getTime();
  const mdict = new Mdict(dictPath);
  let words = mdict.rangeKeyWords();
  let sorter = new Sorter(words);
  // sorter.sort(); // 3.9s
  // sorter.bubbleSort(); // 160.791s
  sorter.shellSort(); // 0.454s
  // sorter.quickSort(); // stack-overflow
  // sorter.words = sorter.mergeSort(sorter.words); // 2.449
  sorter.top10();


  let seacher = new Seacher(sorter.words);
  let finalResult = seacher.binarySearch('\'twill');
  console.log(finalResult);
  finalResult = seacher.binarySearch('hello');
  console.log(finalResult);
  finalResult = seacher.binarySearch('partition');
  console.log(finalResult);

  // let builder = new IndexBuilder(sorter.words);
  // builder.build();

  const endTime = new Date().getTime();
  const elapsedTime = endTime - startTime;
  func(mdict, elapsedTime);
  // eslint-disable-next-line
  console.log(`loading ${dictName} dict used: ${elapsedTime / 1000.0} s`);
}

describe('Dictionary-sort', () => {
  describe('oale8.mdx', () => {
    it('#version', () => {
      // debug case 1:
      recorder('01-oale8', 'mdx/testdict/oale8.mdx', (mdict) => {
        expect(mdict._version).to.be.equal(2);
      });
    });
  });
});
