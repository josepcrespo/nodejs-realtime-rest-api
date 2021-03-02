const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

const checkPermissions = require('feathers-permissions');
const validateUserCreate = require('../../hooks/users/users.create.validate');
const validateUserGet = require('../../hooks/users/users.get.validate');
const validateUserPatch = require('../../hooks/users/users.patch.validate');
const validateUserRemove = require('../../hooks/users/users.remove.validate');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ checkPermissions({ roles: [ 'admin' ] }) ],
    get: [ validateUserGet() ],
    create: [
      checkPermissions({ roles: [ 'admin' ] }),
      validateUserCreate(),
      hashPassword('password')
    ],
    update: [
      checkPermissions({ roles: [ 'admin' ] }),
      validateUserPatch(),
      hashPassword('password'),
    ],
    patch: [
      checkPermissions({ roles: [ 'admin' ] }),
      validateUserPatch(),
      hashPassword('password')
    ],
    remove: [
      checkPermissions({ roles: ['admin'] }),
      validateUserRemove()
    ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
