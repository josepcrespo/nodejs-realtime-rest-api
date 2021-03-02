const assert = require('assert');
const { AssertionError } = require('assert');
const app = require('../../../src/app');

const mailProvider = '@mailprovider.com';
const creatingUserWithout = 'Throws a BadRequest when tries to create a `sale` without ';
const expectedBadRequest = 'Expected Feathers BadRequest not thrown.';
const feathersErrorType = 'FeathersError';
const badRequestHtmlStatusCode = 400;
const model = 'Sport';
const engine = 'hybrid';
const doors = '3';
const color = 'red';
const extras = 'basic';

describe('sales hook: create.validate', () => {
  it(creatingUserWithout + '`model`, `engine`, `doors`, `color`, `extras`.',
    async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    try {
      await app.service('sales').create({}, { user });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message,
        'Please, provide values for `model`, `engine`, ' +
        '`doors`, `color` and, `extras`.'
      );
    }
  });

  it(creatingUserWithout + '`model`.', async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    try {
      await app.service('sales').create({
       engine, doors, color, extras
     }, { user });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide a value for `model`.');
    }
  });

  it(creatingUserWithout + '`engine`.', async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    try {
      await app.service('sales').create({
       model, doors, color, extras
     }, { user });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide a value for `engine`.');
    }
  });

  it(creatingUserWithout + '`doors`.', async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    try {
      await app.service('sales').create({
       model, engine, color, extras
     }, { user });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide a value for `doors`.');
    }
  });

  it(creatingUserWithout + '`color`.', async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    try {
      await app.service('sales').create({
       model, engine, doors, extras
     }, { user });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide a value for `color`.');
    }
  });

  it(creatingUserWithout + '`extras`.', async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    try {
      await app.service('sales').create({
       model, engine, doors, color
     }, { user });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide a value for `extras`.');
    }
  });
  
});