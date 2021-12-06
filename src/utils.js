/**
 * print time of function
 * @param {string} name 
 * @param {function} fn 
 * @param  {...any} rest 
 * @returns any
 */
function measureTime(name, fn, ...rest) {
  const start = Date.now()
  let res = fn(...rest)
  console.log(`${name}: ${Date.now() - start}ms`)
  return res
}

export default {
  measureTime
}