'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 1000]
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Track, { foreignKey: 'trackId' });
  };
  return Comment;
};
