// Initializes the `users` service on path `/users`
const { Users }   = require('./users.class');
const createModel = require('../../models/users.model');
const hooks       = require('./users.hooks');

/**
 * For convenience and demonstration purposes,
 * we initialize the `users` database table
 * with the three types of users we need.
 */
const initialUsers = [{
  'email': 'admin@fictionalMotor.com',
  'password': 'asdf1234',
  'permissions': 'admin'
}, {
  'email': 'salesman1@fictionalMotor.com',
  'password': 'asdf1234',
  'permissions': 'salesman'
}, {
  "email": "manufacturer1@fictionalMotor.com",
  "password": "asdf1234",
  "permissions": "manufacturer"
}];

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);

  // Initializes the DB with the `initialUsers` array, in case the app is
  // connected to the `mysql` server defined into the default.json file.
  if (process.env.NODE_ENV !== 'test') {
    initialUsers.forEach(user => {
      service.find({ query: { email: user.email } })
        .then(result => {
          if (result.total === 0) {
            service.create(user);
            console.log('New user created:', user);
          }
        });
    });
  }

  // https://github.com/alt3/sequelize-to-json-schemas#usage
  const jsonSchemaManager = app.get('jsonSchemaManager');
  const openApi3Strategy = app.get('openApi3Strategy');
  const serviceSchema = jsonSchemaManager.generate(options.Model, openApi3Strategy);

  // Adding example values for Swagger UI.
  serviceSchema.properties.email.example       = 'hello@emailprovider.com';
  serviceSchema.properties.password.example    = '1qazxsw23edcvfr4';
  serviceSchema.properties.githubId.example    = '3214895';
  serviceSchema.properties.permissions.example = 'admin';

  // Adding the possible values for the permissions property.
  serviceSchema.properties.permissions.enum = ['admin', 'salesman', 'manufacturer'];

  // Adding a description for the githubId property.
  serviceSchema.properties.githubId.description =
    'This property is set automatically when using the GitHub OAuth strategy. ' +
    'Normally you should use the "local" strategy, with an email and a password.';

  // The Swagger definition with the help of `sequelize-to-json-schemas` package.
  service.docs = {
    description: 'Service to manage users.',
    definitions: {
      users: serviceSchema,
      'users_list': {
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
  app.use('/users', service);
};
