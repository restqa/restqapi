
module.exports = function ({ Given, When, Then, ...rest }) {
  // handle unexpected steps
  const unHandleSteps = Object.keys(rest)
  if (unHandleSteps.length > 0) {
    unHandleSteps.forEach(step => console.log(`'${step}' is not valid step.`))
    console.log('You will find all the available steps in the documentation:')
    console.log('=> https://restqa.github.io/documentation/docs/getting-started/installation')
    console.log('or you can contribute and add a new step')
    console.log('=> https://github.com/restqa/restqapi')
  }

  /*********************************************
   * GIVEN
   ********************************************/
  require('./1-given').forEach(step => Given.apply(this, step))

  /*********************************************
   * WHEN
   ********************************************/
  require('./2-when').forEach(step => When.apply(this, step))

  /*********************************************
   * THEN
   ********************************************/
  require('./3-then').forEach(step => Then.apply(this, step))
}
