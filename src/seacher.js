export default class Seacher {
    constructor(wordItems) {
        this.words = wordItems;
    }

    binarySearch(word) {
       if (!word || word.length <= 0) {
           return null;
       }
       let left = 0;
       let right = this.words.length - 1;
       while(left < right) {
           let middle = Math.floor(right + left / 2);
           let midWord = this.words[middle];
           if (midWord.keyText < word) {
               left = middle + 1;
           } else if (midWord.keyText > word) {
               right = middle - 1;
           } else {
               return midWord;
           }
       }
       return null;
    }

}