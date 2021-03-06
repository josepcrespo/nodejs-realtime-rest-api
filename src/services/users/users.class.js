const { Service } = require('feathers-sequelize');

exports.Users = class Users extends Service {
  create (data, params) {
    // This is the information we want from the user signup data
    const { email, password, githubId, permissions } = data;
    // The complete user
    const userData = {
      email,
      password,
      githubId,
      permissions
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }
};
