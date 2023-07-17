import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("TaskPoints", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      points: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      makeTask: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      tasksId: {
        type: DataTypes.INTEGER,
        references: { model: "Tasks", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("TaskPoints");
  },
};
