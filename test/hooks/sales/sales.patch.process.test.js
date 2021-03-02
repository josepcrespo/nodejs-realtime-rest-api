const assert = require('assert');
const app = require('../../../src/app');

const model = 'sport';
const engine = 'hybrid';
const doors = '3';
const color = 'red';
const extras = 'basic';

describe('sales hook: patch.process', () => {

  it('updates a `sale` and attaches the ID of the `user` who updated him', async () => {
    const newModel = 'sedan';
    // Calling a Feathers service from inside the Feathers app
    // can be done without providing authentication on the request.
    const salesUser = await app.service('users').create({
      email: 'user' + new Date().getTime() + '@mailprovider.com',
      password: 'secret'
    });
    let sale = await app.service('sales').create(
      { model, engine, doors, color, extras },
      { user: salesUser }
    );
    sale = await app.service('sales').patch(
      sale.id, 
      { name: newModel },
      { user: salesUser }
    );

    // Makes sure `updatedById` property value is equal
    // to the ID of user who updated it.
    assert.equal(sale.updatedById, salesUser.id);

    // Makes sure the `updated` property value has been changed as expected
    assert.equal(sale.model, newModel);
  });
  
});