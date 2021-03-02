// Initializes the `sales` service on path `/sales`
const createService = require('feathers-sequelize');
const createModel   = require('../../models/sales.model');
const hooks         = require('./sales.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/sales', new Sales(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sales');

  service.hooks(hooks);

  // https://github.com/alt3/sequelize-to-json-schemas#usage
  const jsonSchemaManager = app.get('jsonSchemaManager');
  const openApi3Strategy = app.get('openApi3Strategy');
  const serviceSchema = jsonSchemaManager.generate(options.Model, openApi3Strategy);

  // Adding example values for Swagger UI.
  serviceSchema.properties.model.example  = 'Sedan';
  serviceSchema.properties.engine.example = 'Hybrid';
  serviceSchema.properties.doors.example  = '5';
  serviceSchema.properties.color.example  = 'red';
  serviceSchema.properties.extras.example = 'all';

  // The Swagger definition with the help of `sequelize-to-json-schemas` package.
  service.docs = {
    description: 'Service to manage sales.',
    definitions: {
      sales: serviceSchema,
      'sales_list': {
        type: 'array',
        items: serviceSchema
      }
    },
    securities: ['get', 'create', 'update', 'patch', 'remove'],
    operations: {
      find: {
        security: [{
          BearerAuth: []
        }]
      }
    }
  };

  // Expose the Swagger definition.
  app.use('/sales', service);
};
