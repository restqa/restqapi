const given = require('./functions')

/**
 * All the steps related to the API Request
 *
 * @module Given
*/

module.exports = [

  /**
   *  Format:
   *  ['Step definition', function handler, 'description','Tags']
   *
   *  Example:
   *  ['I do {int} + {int}', add, 'Calculate an addition', 'add, calculator, additional']
   *
   */

  /**
    * ### Given I have the api gateway
    * Define the api gateway host (take a look at the config file).
    *
    *
    * @example
    * Given I have the api gateway
    *
    *
    * @function gateway
    */
  ['I have the api gateway', given.gateway, 'Create a new api request targeting the default api gateway', 'api, url'],

  /**
    * ### Given I have the api gateway hosted on {string}
    * Define the api gateway hosted on the given on the specific api gateway
    *
    *
    * @example <caption>If you want to use a specific host you can use</caption>
    * Given I have the api gateway hosted on "https://api.example.com"
    *
    *
    * @function gateway
    */
  ['I have the api gateway hosted on {string}', given.gateway, 'Create a new api request targeting on a given api gateway', 'api, url'],

  // Path + method

  /**
    * ### Given I have the path {string}
    * Define the request path
    * placeholder can be used within the path for dynamic call (ex: /users/{{userid}})
    *
    * @example
    * Given I have the path "/users/1"
    * Given I have the path "/users/1/addresses"
    * Given I have the path "/users/{{ userId }}/addresses"
    *
    * @function path
    */
  ['I have the path {string}', given.path, 'add the path of the request (ex: /quotes)', 'request, path, api'],

  /**
    * ### Given I have the method {string}
    * Define the request method (default GET)
    * Available : GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD
    *
    * @example
    * Given I have the method "PATCH"
    *
    * @function method
    */
  ['I have the method {string}', given.method, 'add the method to the request (ex: POST)', 'request, method, api'],

  /**
    * ### Given I send a {string} request to {string}
    * Construct a request to a resource using an HTTP method
    *
    * @example
    * Given I send a "GET" request to "/customers"
    * Given I send a "POST" request to "/customers"
    * Given I send a "PUT" request to "/customers/1234"
    * Given I send a "DELETE" request to "/customers/1234"
    *
    * @function methodPath
    */
  ['I send a {string} request to {string}', given.methodPath, 'add the method and the path of the request', 'request, method, path, api'],

  //  ****************************************************************************************************
  //  Headers
  //  ****************************************************************************************************

  /**
   * ### Given the header contains {string} as {string}
   * Set one request header
   *
   * @example
   * Given the header contains "Content-Type" as "application/json"
   * Given the header contains "Accept-language" as "en"
   * Given the header contains "user-agent" as "curl"
   *
   * @example <caption>Placeholder from datasets</caption>
   * Given the header contains "Accept-language" as {{ language }}
   * Given the header contains "user-agent" as {{ currentUserAgent }}
   *
   * @function header
   */
  ['the header contains {string} as {data}', given.header, 'add a placeholded value to request headers  (ex "apikey" -> {{ apikey }})', 'request, headers'],
  ['the header contains {string} as {string}', given.header, 'add a string value to request headers (ex "x-correlation-id" -> "xxxx-xxxxx-1111-2222")', 'request, headers'],

  /**
   * ### Given I add the headers:
   * Set one or more request headers in a single step.
   *
   * @example
   * Given I add the headers:
   *   | Content-Type     | application/json |
   *   | Accept-Language  | en               |
   *
   * @example <caption>Placeholder from datasets</caption>
   * Given I add the headers:
   *   | Content-Type     | {{contentType}} |
   *   | Accept-Language  | {{ language }}  |
   *
   * @function headers
   */
  ['I add the headers:', given.headers, 'Adding multiple headers to the request (table format)', 'request, headers, table'],

  /**
   * ### Given I have the bearer token {string}
   * Set the bearer token into the authorization headers
   *
   * @example
   * Given I have the bearer token {string}
   *
   * @example <caption>Placeholder from datasets</caption>
   * Given i have the bearer token {{ token }}
   *
   * @function AuthorizatioinHeaderBearerToken
   */
  ['I have the bearer token {data}', given.bearer, 'Set a placeholded bearer token into the authorization header (ex: "token" -> {{ token }})', 'request, headers, authorization, bearer'],
  ['I have the bearer token {string}', given.bearer, 'Set the bearer token into the authorization header', 'request, headers, authorization, bearer'],

  //  ****************************************************************************************************
  //  Query String
  //  ****************************************************************************************************

  /**
   * ### Given the query parameter contains {string} as {string}
   * Set one or more request query parameters (example: /pets?price=10&name=john)
   *
   * @example <caption>string</caption>
   * Given the query parameter contains "sort" as "price"
   * Given the query parameter contains "name" as "john"
   *
   * @example <caption>number</caption>
   * Given the query parameter contains "limit" as 10
   * Given the query parameter contains "offset" as 30
   *
   * @example <caption>Placeholder from datasets</caption>
   * Given the query parameter contains "sort" as {{ price }}
   * Given the query parameter contains "name" as {{ name }}
   *
   * @function queryString
   */
  ['the query parameter contains {string} as {data}', given.queryString, 'add a placeholded value to request query parameter (ex "gender" : {{ gender }} for "gender=1")', 'request, query string, qs'],
  ['the query parameter contains {string} as {string}', given.queryString, 'add a string value to request query parameter  (ex "gender" : "MALE" for "gender=MALE")', 'request, query string, qs'],
  ['the query parameter contains {string} as {int}', given.queryString, 'add a string value to request query parameter (ex "gender" : "1" for "gender=1")', 'request, query string, qs'],

  /**
   * ### Given I add the query string parameters:
   * Set one or more request query parameter in a single step.
   *
   * @example
   * Given I add the query string parameters:
   *   | sort     | price |
   *   | name     | john  |
   *
   * @example <caption>Placeholder from datasets</caption>
   * Given I add the query string parameters:
   *   | sort     | {{ sort }} |
   *   | name     | {{ name }}  |
   *
   * @function queriesString
   */
  ['I add the query string parameters:', given.qs, 'Adding multiple query parameters to the request (table format)', 'request, query string, qs, table'],

  //  ****************************************************************************************************
  //  JSON REQUEST BODY
  //  ****************************************************************************************************

  /**
   * ### Given the payload contains {string} as {string | int | float | placeholder | data}
   * Set one or more request json body (support dot-object or jsonpath property)
   *
   * @example <caption>string</caption>
   * Given the payload contains "firstname" as "john"
   * Given the payload contains "lastname" as "doe"
   * Given the payload contains "people.lastname" as "doe"
   *
   * @example <caption>int</caption>
   * Given the paylaod contains "limit" as 10
   * Given the paylaod contains "offset" as 30
   * Given the paylaod contains "page.offset" as 30
   *
   * @example <caption>float</caption>
   * Given the paylaod contains "size" as 1.1
   * Given the paylaod contains "weight" as 1.0
   * Given the paylaod contains "body.weight" as 1.0
   *
   * @example <caption>Placeholder form from datasets</caption>
   * Given the paylaod contains "sort" as {{ price }}
   * Given the paylaod contains "name" as {{ name }}
   * Given the paylaod contains "list.name" as {{ name }}
   *
   * @function JsonPayload
   */
  ['the payload contains {string} as {data}', given.payload, 'add a property with placeholded value to the request body, the pattern used is dot-object  ( ex: "quotes.detail.id" -> {{quoteId}})', 'request, body, restqdata'],
  ['the payload contains {string} as {string}', given.payload, 'add a property with string value to the request body, the pattern used is dot-object  ( ex: "quotes.detail.id" -> "ASD12355")', 'request, body, dot'],
  ['the payload contains {string} as {int}', given.payload, 'add a property with int value to the request body, the pattern used is dot-object  ( ex: "quotes.detail.amount" -> 200)', 'request, body, dot'],
  ['the payload contains {string} as {float}', given.payload, 'add a property with float value to the request body, the pattern used is dot-object  ( ex: "quotes.detail.amount" -> 200)', 'request, body, dot'],

  /**
   * ### Given the payload contains {string} as null
   * Set a value as null in the json request body (support dot-object or jsonpath property)
   *
   * @example
   * Given the payload contains "firstname" as null
   * Given the payload contains "user.firstname" as null
   *
   * @function JsonPayloadNull
   */
  ['the payload contains {string} as null', given.payloadNull, 'add a property with null value to the request body, the pattern used is dot-object  ( ex: "quotes.detail.amount" -> null)', 'request, body, null'],

  /**
   * ### Given the payload contains {string} as true
   * Set a value as true in the json request body (support dot-object or jsonpath property)
   *
   * @example
   * Given the payload contains "active" as true
   * Given the payload contains "user.active" as true
   *
   * @function JsonPayloadTrue
   */
  ['the payload contains {string} as true', given.payloadTrue, 'active" -> true', 'request, body, boolean'],

  /**
   * ### Given the payload contains {string} as false
   * Set a value as false in the json request body (support dot-object or jsonpath property)
   *
   * @example
   * Given the payload contains "active" as false
   * Given the payload contains "user.active" as false
   *
   * @function JsonPayloadFalse
   */
  ['the payload contains {string} as false', given.payloadFalse, 'active" -> false', 'request, body, boolean'],

  /**
   * ### Given the payload contains {string} as empty array
   * Set a value as empty array in the json request body (support dot-object or jsonpath property)
   *
   * @example
   * Given the payload contains "list" as empty array
   * Given the payload contains "user.list" as empty array
   *
   * @function JsonPayloadEmptyArray
   */
  ['the payload contains {string} as empty array', given.payloadEmptyArray, 'add property with empty array to the request body', 'request, body, array'],

  /**
   * ### Given I add the request body:
   * Set one or more request body information in a single step.
   *
   * @example
   * Given I add the request body:
   *   | firstname | john |
   *   | lastname  | doe  |
   *
   * @example <caption>Placeholder from datasets</caption>
   * Given I add the request body:
   *   | firstname    | {{ firstName }} |
   *   | lastname     | {{ lastName }}  |
   *
   * @function JsonPayloadTable
   */
  ['I add the request body:', given.payloads, 'Adding multiple query parameters to the request (table format)', 'request, body, dot, table']
]
