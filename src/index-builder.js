import fs from 'fs';
// import {Uint64BE} from "int64-buffer";


class SkipListNode {
    constructor(level) {
        this.level = level;
        this.index = [];
        this.next;
        this.below;
    }
}

export default class IndexBuilder {
    constructor(sorted_words, file_path) {
        this.words = sorted_words;
        this.file_path = file_path;
    }

    build() {
        let fd = fs.openSync('/tmp/medict.idx.dat', 'a+', 0o666);
        let buf = Buffer.alloc(6, '999999');
        fs.writeSync(fd /* file discriptor */, buf /* buffer */, 3 /* offset */, 3 /* legth */, 1 /* position */);
        fs.closeSync(fd);
    }
}