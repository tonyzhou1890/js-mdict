import { merge } from "lodash";

class IndexFile {
    constructor() {
        this.partitionID = 0;
        this.startKey = "";
        this.endKey = "";
    }
}

export default class Sorter {
    constructor(wordItems) {
        this.words = wordItems;
    }

    sort() {
        let len = this.words.length;
        let preIndex, current;
        for (let i = 1; i < len; i ++) {
            preIndex = i - 1;
            current = this.words[i];
            // console.log(`sorting(${i}): ${current.keyText}`);
            // 找到比当前词大的词，都往后挪动一个位置
            while(preIndex > 0 && this.words[preIndex].keyText > current.keyText) {
                this.words[preIndex + 1] = this.words[preIndex];

                preIndex--
            }
            // 插入当前词
            this.words[preIndex + 1] = current;
        }
    }

    bubbleSort() {
        let len = this.words.length;
        for (let i = 0; i < len - 1; i ++) {
            for (let j = 0; j < len - 1 - i; j ++) {
                if (this.words[j].keyText > this.words[j + 1].keyText) {
                    let temp = this.words[j+1];
                    this.words[j+1] = this.words[j];
                    this.words[j] = temp;
                }
            }
        }

    }
    // 希尔排序 0.454s
    shellSort() {
        let len = this.words.length;
        let temp;
        let gap = 1;
        while(gap < len/3) {
            gap = gap * 3 + 1;
        }
        for (gap; gap > 0; gap = Math.floor(gap/3)) {
            for (let i = gap; i < len; i ++) {
                temp = this.words[i];
                let j = 0;
                for (j = i - gap; j >= 0 && this.words[j].keyText > temp.keyText; j -= gap) {
                    this.words[j + gap]= this.words[j]
                }
                this.words[j + gap] = temp;
            }
        }
    }
    // 快速排序 2.449
    quickSort(left, right) {
        let that = this;
        function swap(i, j) {
            let temp = that.words[i];
            that.words[i] = that.words[j];
            that.words[j] = temp;
        }

        function partition(left, right) {
            let pivot = left;
            let index = pivot + 1;
            for (let i = index; i <= right; i++) {
                if (that.words[i].keyText < that.words[pivot].keyText) {
                    swap(i, index);
                    index++;
                }
            }
            swap(pivot, index)
            return index - 1;
        }

        let len = this.words.length;
        left = typeof left != 'number' ? 0 : left;
        right = typeof right != 'number' ? len - 1 : right;

        if (left < right) {
            let partitionIdx = partition(left, right);
            this.quickSort(left, partitionIdx - 1);
            this.quickSort(partitionIdx + 1, right);
        }
    }

    mergeSort(arr) {
        function merge(left, right) {
            let result = [];
            while(left && left.length && right && right.length) {
                if (left[0].keyText <= right[0].keyText) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }

            while(left && left.length) {
                result.push(left.shift());
            }

            while(right && right.length) {
                result.push(right.shift());
            }
            return result;
        }


        let len = arr.length;
        if (len < 2) {
            return arr;
        }

        let middle  = Math.floor( len / 2);
        let left = arr.slice(0, middle);
        let right = arr.slice(middle);
        return merge(this.mergeSort(left), this.mergeSort(right));
    }

    top10() {
        for (let i =0; i < 10; i++) {
            console.log(this.words[i]);
        }
    }

}

