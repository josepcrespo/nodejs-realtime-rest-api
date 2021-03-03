const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');

const processSaleCreate = require('../../hooks/sales/sales.create.process');
const validateSaleCreate = require('../../hooks/sales/sales.create.validate');
const processSalePatch = require('../../hooks/sales/sales.patch.process');
const validateSalePatch = require('../../hooks/sales/sales.patch.validate');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ checkPermissions({ roles: [ 'admin', 'manufacturer' ] }) ],
    get: [ checkPermissions({ roles: [ 'admin', 'manufacturer' ] }) ],
    create: [
      checkPermissions({ roles: [ 'admin', 'salesman' ] }),
      processSaleCreate(),
      validateSaleCreate()
    ],
    update: [
      checkPermissions({ roles: [ 'admin', 'salesman' ] }),
      processSalePatch(),
      validateSalePatch()
    ],
    patch: [
      checkPermissions({ roles: [ 'admin', 'salesman' ] }),
      processSalePatch(),
      validateSalePatch()
    ],
    remove: []
  },

  after: {
    all: [],
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
