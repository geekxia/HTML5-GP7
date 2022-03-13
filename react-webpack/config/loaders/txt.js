module.exports = function loader (source) {
  // console.log(typeof source)
  // console.log('source', source)
  const result = source.replace(/\-/img, ' ')
  // do something
  return `module.exports = ${JSON.stringify(result)}`
}
