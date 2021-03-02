const users = require('./users/users.service.js');
const sales = require('./sales/sales.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sales);
};
