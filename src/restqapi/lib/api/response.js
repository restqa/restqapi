const dot = require('dot-object')
const jp = require('jsonpath')

const Response = function (result) {
  const { request, statusCode, headers, body, timing } = result

  const isJson = (headers['content-type'] || '').match(/application\/json/i)

  let dotBody = {}

  if (isJson) {
    dotBody = dot.dot(body || {})
  }

  const findInBody = (property) => {
    if (property.charAt(0) === '$') { // if $ is the first char we will use jsonpath
      return jp.query(body || {}, property,1)[0]
    } else { // Otherwise we use simple dotObject
      return dotBody[property]
    }
  }

  const findInHeader = (property) => {
    return headers[property] || headers[property.toLowerCase()]
  }

  return {
    request,
    timing,
    statusCode,
    headers,
    body,
    findInBody,
    findInHeader,
    getResult: () => result
  }
}

module.exports = Response
