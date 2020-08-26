const then = require('./functions')

/**
 * All the steps related to the API response
 *
 * @module Then
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
   * ### Then I should receive a response with the status {int}
   * Ensure the response was received with a given status.
   *
   * @example
   * Then I should receive a response with the status 200
   * Then I should receive a response with the status 404
   *
   * @function httpCode
   */
  ['I should receive a response with the status {int}', then.httpCode, 'Check the response http code', 'api, response, status, httpcode'],

  /**
   * ### Then the response time is under {int} ms
   * Ensure the response time is lower than the given time (in microseconds)
   *
   * @example
   * Then the response time is under 100ms
   *
   * @function httpLatency
   */
  ['the response time is under {int} ms', then.httpTiming, 'Check the response latency', 'api, response, time, timing, latency'],

  /**
   * ### Then the header {string} should be {string}
   * Ensure a response header equals the expect value
   *
   * @example
   * Then the header "Content-Type" should be "application/json"
   *
   * @function header
   */
  ['the header {string} should be {string}', then.headerValueEqual, 'Check if a property in the response header has the exact string value', 'api, response, table, headers, header'],

  /**
   * ### Then the response header should contains:
   * Ensure a response header equals the list of values
   *
   * @example
   * Then the response headers should contains:
   *   | Content-Type   | application/json |
   *   | Content-Length | 1458             |
   *
   * @example <caption>Using placeholders</caption>
   * Then the response headers should contains:
   *   | Content-Type   | {{ contentType}} |
   *   | Content-Length | 1458             |
   *
   *
   * @function headers
   */
  ['the response headers should contains:', then.headers, 'Check multiple response headers (table format)', 'api, response, table, headers, header'],

  /**
   * ### Then {string} should be on the response header
   * Ensure a response header contains one specific property
   *
   * @example
   * Then "Content-Length" should be on the response header
   * Then "X-response-time" should be on the response header
   *
   *
   * @function headersContains
   */
  ['{string} should be on the response header', then.headerValueExist, 'Check if a property is in the response header', 'api, response, table, headers, header'],

  /**
   * ### Then {string} should not be on the response header
   * Ensure a response header doesn't contain one specific property
   *
   * @example
   * Then "X-response-time" should not be on the response header
   * Then "poweered-by" should be not on the response header
   *
   *
   * @function headersNotContains
   */
  ['{string} should not be on the response header', then.headerValueNotExist, 'Check if a property is in the response header', 'api, response, table, headers, header'],

  // Response body
  /**
   * ### Then the response should be empty array
   * Ensure a response body contains an empty array
   *
   * @example
   * Then the response should be empty array
   *
   * @function emptyArray
   */
  ['the response should be empty array', then.shouldBeEmptyArrayResponse, 'Check a value in the body response that it is empty array', 'api, response, body, array'],

  /**
   * ### Then the response should not be empty array
   * Ensure a response body doesn't contain an empty array
   *
   * @example
   * Then the response should not be empty array
   *
   * @function notEmptyArray
   */
  ['the response should not be empty array', then.shouldNotBeEmptyArrayResponse, 'Check if the response list is not empty', 'api, response, body, jsonpath, dot-object, array'],

  /**
   * ### Then the response should be empty
   * Ensure a response body is empty
   *
   * @example
   * Then the response should be empty
   *
   * @function emptyResponse
   */
  ['the response should be empty', then.shouldBeEmptyResponse, 'Check if the response body is empty', 'api, response, body'],

  /**
   * ### Then the response body at {string} should equal {string | int | data }
   * Ensure a JSON response body equals a given value at the JSON path. Equality is determined
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "id" should equal 10
   * Then the response body at "user.firstname" should equal "john"
   * Then the response body at "user.lastname" should equal {{ lastname }}
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.id" should equal 10
   * Then the response body at "$.user.firstname" should equal "john"
   * Then the response body at "$.user.lastname" should equal {{ lastname }}
   *
   * @function bodyPropertyEqual
   */
  ['the response body at {string} should equal {data}', then.shouldBeString, 'Check a value in the body response as a string (dot-object pattern)', 'api, response, body, jsonpath, dot-object, data'],
  ['the response body at {string} should equal {string}', then.shouldBeString, 'Check a value in the body response as a string (dot-object pattern)', 'api, response, body, jsonpath, dot-object, string'],
  ['the response body at {string} should equal {int}', then.shouldBeNumber, 'Check a value in the body response as a int (dot-object pattern)', 'api, response, body, jsonpath, dot-object, number'],

  /**
   * ### Then the response body at {string} should equal true
   * Ensure a JSON response body equals a given boolean value as true
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "active" should equal true
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.active" should equal true
   *
   * @function bodyPropertyEqualTrue
   */
  ['the response body at {string} should equal true', then.shouldBeTrue, 'Check if a value is true in the body response (dot-object pattern)', 'api, response, body, jsonpath, dot-object, true'],

  /**
   * ### Then the response body at {string} should equal false
   * Ensure a JSON response body equals a given boolean value as false
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "active" should equal false
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.active" should equal false
   *
   * @function bodyPropertyEqualFalse
   */
  ['the response body at {string} should equal false', then.shouldBeFalse, 'Check if a value is false in the body response (dot-object pattern)', 'api, response, body, jsonpath, dot-object, false'],

  /**
   * ### Then the response body at {string} should equal null
   * Ensure a JSON response body equals a given null value
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "active" should equal null
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.active" should equal null
   *
   * @function bodyPropertyEqualNull
   */
  ['the response body at {string} should equal null', then.shouldBeNull, 'Check if a value is null in the body response (dot-object pattern)', 'api, response, body, jsonpath, dot-object, null'],

  /**
   * ### Then the response body at {string} should equal empty
   * Ensure a JSON response body equals an empty string
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "active" should equal empty
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.active" should equal empty
   *
   * @function bodyPropertyEqualEmpty
   */
  ['the response body at {string} should equal empty', then.shouldBeEmpty, 'Check if a value is empty in the body response (dot-object pattern)', 'api, response, body, jsonpath, dot-object, empty'],

  /**
   * ### Then the response body at {string} should be an array
   * Ensure a JSON response body equals an array type
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "user.list" should be an array
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.user.list" should be an array
   *
   * @function bodyPropertyIsArray
   */
  ['the response body at {string} should be an array', then.shouldBeAnArray, 'Check if a value is an array in the body response (dot-object pattern)', 'api, response, body, jsonpath, dot-object, array'],

  /**
   * ### Then the response body at {string} should be an array of {int} item(s)
   * Ensure a JSON response body equals an array containing a given items
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "user.list" should be an array of 10 item(s)
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.user.list" should be an array of 10 item(s)
   *
   * @function bodyPropertyIsArrayOfLenght
   */
  ['the response body at {string} should be an array of {int} item(s)', then.shouldBeAnArrayOfXItems, 'Check if a value is an array of a few items in the body response (dot-object pattern)', 'api, response, body, jsonpath, dot-object, array'],

  /**
   * ### Then the response body at {string} should be close to now
   * Ensure a JSON response body has a time set close to now ( -/+ 1 minute)
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "user.createdAt" should equal close to now
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.user.list" should equal close to now
   *
   * @function bodyPropertyIsATimeCloseToNow
   */
  ['the response body at {string} should equal close to now', then.shouldBeNow, 'Check if a date is close to now (ex: to check if a createdAt date is valid)', 'api, response, body, jsonpath, dot-object, now'],

  /**
   * ### Then the response body at {string} should not be null
   * Ensure a JSON response body is not null
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "user.children" should not be null
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.user.childern" should not be null
   *
   * @function bodyPropertyIsNotNull
   */
  ['the response body at {string} should not be null', then.shouldNotBeNull, 'Check if a value is not null in the body response (dot-object pattern)', 'api, response, body, jsonpath, dot-object, null'],

  /**
   * ### Then the response body at {string} should match {string}
   * Ensure a JSON response body matches a given regexp
   *
   * @example <caption>Using dot object</caption>
   * Then the response body at "user.occupation" should match "/pilot/"
   *
   * @example <caption>Using json path</caption>
   * Then the response body at "$.user.occupation" should match "/pilot/"
   *
   * @function bodyPropertyShouldMatchRegexp
   */
  ['the response body at {string} should match {string}', then.shouldMatch, 'Check if a value match a specific regex', 'api, response, body, jsonpath, dot-object, regexp, regex'],

  /**
   * ### Then the response list contains {int} items
   * Ensure a JSON response body has an array at the root level an contains a given number of items
   *
   * @example <caption>Using dot object</caption>
   * Then the response list contains "12" items
   *
   * @function bodyListContainNumberOfItem
   */
  ['the response list should contain {int} item(s)', then.shouldBeArraySize, 'Check if the response list is of a certain size', 'api, response, body, jsonpath, dot-object, array'],

  // Response Dataset

  /**
   * ### Then add the value {string} from the response header to the dataset as {string}
   * Pick of the reponse header value and add it into the dataset storage
   * This will allow you to reuse value in another step
   *
   * @example
   * Then add the value "Content-Type"  from the response header to the dataset as "contentType"
   * Given i have the api gateway
   *   And the header contains "Content-Type" as {{ contentTypw }}
   *
   *
   * @function saveHeaderPropertyIntoTheDataset
   */
  ['add the value {string} from the response header to the dataset as {string}', then.addHeaderPropertyToDataset, 'Take on of the value from the response header and add it to the dataset', 'api, response, header, jsonpath, dot-object, dataset'],

  /**
   * ### Then add the value {string} from the response body to the dataset as {string}
   * Pick of the reponse body value and add it into the dataset storage
   * This will allow you to reuse value in another step
   *
   * @example <caption>Using dot object</caption>
   * Then add the value "user.id"  from the response body to the dataset as "userId"
   * Given i have the api gateway
   *   And I have the path "/users/{userId}"
   *
   * @example <caption>Using json path</caption>
   * Then add the value "$.user.id"  from the response body to the dataset as "userId"
   * Given i have the api gateway
   *   And I have the path "/users/{{userId}}"
   *
   * @function saveBodyPropertyIntoTheDataset
   */
  ['add the value {string} from the response body to the dataset as {string}', then.addBodyPropertyToDataset, 'Take on of the value from the response body and add it to the dataset', 'api, response, body, jsonpath, dot-object, dataset']
]
