const { Service } = require('feathers-sequelize');

exports.Sales = class Sales extends Service {
  create (data, params) {
    // This is the information we want from the sale signup data
    const { model, engine, doors, color, extras, createdById } = data;
    // The complete sale
    const saleData = { model, engine, doors, color, extras, createdById };

    // Call the original `create` method with existing `params` and new data
    return super.create(saleData, params);
  }
};
