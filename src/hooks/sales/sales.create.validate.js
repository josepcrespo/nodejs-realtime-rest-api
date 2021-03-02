// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (
      !data.model &&
      !data.engine &&
      !data.doors &&
      !data.color &&
      !data.extras
    ) {
      throw new BadRequest(
        'Please, provide values for ' +
        '`model`, `engine`, `doors`, `color` and, `extras`.'
      );
    } else {
      if (!data.model) {
        throw new BadRequest('Please, provide a value for `model`.');
      }
      if (!data.engine) {
        throw new BadRequest('Please, provide a value for `engine`.');
      }
      if (!data.doors) {
        throw new BadRequest('Please, provide a value for `doors`.');
      }
      if (!data.color) {
        throw new BadRequest('Please, provide a value for `color`.');
      }
      if (!data.extras) {
        throw new BadRequest('Please, provide a value for `extras`.');
      }
    }
    
    return context;
  };
};
