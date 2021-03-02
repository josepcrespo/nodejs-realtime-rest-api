// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;
    
    if (data.model !== undefined && !data.model) {
      throw new BadRequest('Please, provide a valid `model`.');
    }

    if (data.engine !== undefined && !data.engine) {
      throw new BadRequest('Please, provide a valid `engine`.');
    }

    if (data.doors !== undefined && !data.doors) {
      throw new BadRequest('Please, provide a valid `doors`.');
    }

    if (data.color !== undefined && !data.color) {
      throw new BadRequest('Please, provide a valid `color`.');
    }

    if (data.extras !== undefined && !data.extras) {
      throw new BadRequest('Please, provide a valid `extras`.');
    }
    
    return context;
  };
};
