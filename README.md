## mdict-js

this is forked form [js-mdict](https://github.com/terasum/js-mdict). Very Thanks to [terasum](https://github.com/terasum/js-mdict)

## Changes

* add mixed mode. 'stripkey' and 'keyCaseSensitive' will be ignored in this mode (only lookup function and mdx file), lookup will return an array contains all words matched (stripKey and lowercase). this mode will take some time to boot.
  ```
  const Mdict = require('mdict-js')
  const dict = new Mdict('path/xxx.mdx', {
    mode: 'mixed'
  })

  const res = dict.lookup('be')
  console.log(res)
  /**
  [
    { keyText: 'be', definition: 'xxx' },
    { keyText: 'Be', definition: 'xxx' },
    { keyText: 'be-', definition: 'xxx' }
  ]
  **/
  ```