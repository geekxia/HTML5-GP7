export function checkArticleTitle(rule, value) {
  const reg = /^[][]{5,19}$/
  if (value.length <= 20 && value.length>=6) {
    return Promise.resolve()
  } else {
    return Promise.reject(new Error(rule.message))
  }
}

export function checkArticleAuthor(rule, value) {
  if (value.length <= 6 && value.length>=2) {
    return Promise.resolve()
  } else {
    return Promise.reject(new Error(rule.message))
  }
}

export function checkArticleImage(rule, value) {
  const arr = value.split(';').filter(ele=>ele)
  if (arr.length === 2) {
    return Promise.resolve()
  } else {
    return Promise.reject(new Error(rule.message))
  }
}
