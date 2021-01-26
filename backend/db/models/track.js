'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [1],
        }
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awsUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.User, { foreignKey: 'userId' });
    Track.belongsTo(models.Genre, { foreignKey: 'genreId' });
    Track.hasMany(models.Comment, { foreignKey: 'trackId' });
  };
  return Track;
};
