const assert = require('assert');
const { AssertionError } = require('assert');
const app = require('../../../src/app');

const mailProvider = '@mailprovider.com';
const notAllowedEmptyProperties = ['model', 'engine', 'doors', 'color', 'extras'];
const expectedBadRequest = 'Expected Feathers BadRequest not thrown.';
const feathersErrorType = 'FeathersError';
const badRequestHtmlStatusCode = 400;

const model = 'sport';
const engine = 'hybrid';
const doors = '3';
const color = 'red';
const extras = 'basic';

describe('sales hook: patch.validate', () => {

  notAllowedEmptyProperties.forEach(property => {
    it(
      'Throws a BadRequest when tries to update a `sale` with an empty ' +
      '`' + property +'`',
      async () => {
        const user = await app.service('users').create({
          email: 'user' + new Date().getTime() + mailProvider,
          password: 'secret'
        });
        let sale = await app.service('sales').create(
          { model, engine, doors, color, extras },
          { user }
        );
        try {
          const patchObj = new Object;
          patchObj[property.toString()] = '';
          await app.service('sales').patch(sale.id, patchObj, { user });
          assert.fail(expectedBadRequest);
        } catch (error) {
          if (error instanceof AssertionError) {
            throw error;
          }
          assert.equal(error.type, feathersErrorType);
          assert.equal(error.code, badRequestHtmlStatusCode);
          assert.equal(error.message, 'Please, provide a valid `' + property + '`.');
        }
      }
    );
  });
  
});