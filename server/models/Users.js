module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      name: {
        type: DataTypes.STRING,
        allownull: false,
        set: function (val) {
          this.setDataValue("name", val.toUpperCase());
        },
      },
      emailid: {
        type: DataTypes.STRING,
        allownull: false,
        unique: true,
        set: function (val) {
          this.setDataValue("emailid", val.toLowerCase());
        },
      },
      password: {
        type: DataTypes.STRING,
        allownull: false,
      },
      status:{
        type: DataTypes.INTEGER,
        allownull: false,
        defaultValue:0
      }
    }
    );
    Users.associate = (modal) => {
      Users.hasMany(modal.Bills, {
        onDelete: "cascade",
      });
    }
    return Users;
};
