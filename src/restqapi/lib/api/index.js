const got = require('got')
const { Request } = require('./request')
const { Response } = require('./response')

module.exports = function (options) {
  const { config } = options
  let error
  const run = async function () {
    try {
      const options = this.request.getOptions()
      const result = await got(options)

      this.response = new Response(result.restqa)
    } catch (e) {
      // TODO: explain why we handle the reponse here.
      if (e.response && e.response.restqa) {
        this.response = new Response(e.response.restqa)
      } else {
        error = e
        throw e
      }
    }
  }
  return {
    config,
    request: new Request(config.url, config.insecure),
    response: null,
    run,
    toJSON: function () {
      return {
        request: this.request.getOptions(),
        response: this.response && this.response.getResult(),
        error: error && error.message
      }
    }
  }
}
