beforeEach(() => {
  jest.resetModules()
})

describe('# API  Response', () => {
  test('methods', () => {
    let Response = require('./response')

    let result = {
      request: {
        method: 'POST'

      },
      statusCode: 201,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        'foo': 'bar'
      },
      timing: 2000
    }

    let response = Response(result)

    let expectedMethods = [
      'request',
      'timing',
      'statusCode',
      'headers',
      'body',
      'findInBody',
      'findInHeader',
      'getResult'
    ]

    expect(Object.keys(response)).toEqual(expectedMethods)
    expect(response.request).toEqual({ method: 'POST'})
    expect(response.timing).toEqual(2000)
    expect(response.statusCode).toEqual(201)
    expect(response.headers).toEqual({'content-type': 'application/json'})
    expect(response.body).toEqual({'foo': 'bar'})
    expect(response.findInBody).toBeInstanceOf(Function)
    expect(response.findInHeader).toBeInstanceOf(Function)
  })

  test('findInBody', () => {
    let Response = require('./response')

    let result = {
      request: {
        method: 'POST'

      },
      statusCode: 201,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        'foo': {
          'foo': 'bar'
        }
      },
      timing: 2000
    }

    let response = Response(result)

    expect(response.findInBody('foo.foo')).toEqual('bar')
    expect(response.findInBody('$.foo.foo')).toEqual('bar')
    expect(response.findInBody('$.o')).toBeUndefined()
    expect(response.findInBody('o')).toBeUndefined()
  })

  test('findInBody - non json', () => {
    let Response = require('./response')

    let result = {
      request: {
        method: 'POST'

      },
      statusCode: 201,
      headers: {
      },
      timing: 2000
    }

    let response = Response(result)

    expect(response.findInBody('$.o')).toBeUndefined()
    expect(response.findInBody('o')).toBeUndefined()
  })

  test('findInBody - json but no body', () => {
    let Response = require('./response')

    let result = {
      request: {
        method: 'POST'

      },
      statusCode: 201,
      headers: {
        'content-type': 'application/json'
      },
      timing: 2000
    }

    let response = Response(result)

    expect(response.findInBody('$.o')).toBeUndefined()
    expect(response.findInBody('o')).toBeUndefined()
  })

  test('findInHeader', () => {
    let Response = require('./response')

    let result = {
      request: {
        method: 'POST'

      },
      statusCode: 201,
      headers: {
        'content-type': 'application/json',
        'x-req-id': 'zz-xx-yy'
      },
      body: {
        'foo': {
          'foo': 'bar'
        }
      },
      timing: 2000
    }

    let response = Response(result)

    expect(response.findInHeader('X-req-id')).toEqual('zz-xx-yy')
    expect(response.findInHeader('x-req-id')).toEqual('zz-xx-yy')
    expect(response.findInHeader('foo')).toBeUndefined()
  })

  test('getResult', () => {
    let Response = require('./response')

    let result = {
      request: {
        method: 'POST'

      },
      statusCode: 201,
      headers: {
        'content-type': 'application/json',
        'x-req-id': 'zz-xx-yy'
      },
      body: {
        'foo': {
          'foo': 'bar'
        }
      },
      timing: 2000
    }

    let response = Response(result)

    expect(response.getResult()).toEqual(result)
  })
})
