// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const sales = sequelizeClient.define('sales', {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [ ['sedan', 'coupe', 'minivan', 'SUV', 'sport'] ],
        isAlpha: true,
        notEmpty: true,
        notNull: true
      }
    },
    engine: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [ ['gasoil', 'diesel', 'hybrid', 'electric'] ],
        isAlpha: true,
        notEmpty: true,
        notNull: true
      }
    },
    doors: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [ ['3', '5'] ],
        isNumeric: true,
        notEmpty: true,
        notNull: true
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [ ['red', 'green', 'blue', 'black', 'white'] ],
        isAlpha: true,
        notEmpty: true,
        notNull: true
      }
    },
    extras: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [ ['none', 'basic', 'all'] ],
        isAlpha: true,
        notEmpty: true,
        notNull: true
      }
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      },
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updatedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true
      },
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  sales.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const { users } = models;
    sales.belongsTo(users, {
      foreignKey: {
        name: 'createdById',
        allowNull: false
      }
    });
    sales.belongsTo(users, {
      foreignKey: {
        name: 'updatedById',
        allowNull: true
      }
    });
  };

  return sales;
};
