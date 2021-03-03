const assert = require('assert');
const app = require('../../src/app');

describe('sales', () => {

  it('registered the `sales` service', () => {
    const service = app.service('sales');

    assert.ok(service, 'Registered the service');
  });

  it('creates a `sale`', async () => {
    const model = 'coupe';
    const engine = 'electric';
    const doors = '5';
    const color = 'blue';
    const extras = 'all';
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + '@mailprovider.com',
      password: 'secret'
    });
    const sale = await app.service('sales').create(
      { model, engine, doors, color, extras },
      { user }
    );

    // Makes sure the sale is created with the data provided
    assert.ok(sale.model, model);
    assert.ok(sale.engine, engine);
    assert.ok(sale.doors, doors);
    assert.ok(sale.color, color);
    assert.ok(sale.extras, extras);
  });

});
