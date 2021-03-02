const assert = require('assert');
const app = require('../../../src/app');

describe('sales hook: create.process', () => {

  it('creates a `sale` and attaches the ID of the `user` who created him', async () => {
    const model = 'Sport';
    const engine = 'hybrid';
    const doors = '3';
    const color = 'red';
    const extras = 'basic';
    // Calling a Feathers service from inside the Feathers app
    // can be done without providing authentication on the request.
    const salesUser = await app.service('users').create({
      email: 'user' + new Date().getTime() + '@mailprovider.com',
      password: 'secret'
    });

    const sale = await app.service('sales').create(
      { model, engine, doors, color, extras },
      { user: salesUser }
    );

    // Makes sure `createdById` property value is equal
    // to the ID of user who created it.
    assert.equal(sale.createdById, salesUser.id);
  });
  
});