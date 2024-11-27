"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the 'CartUsers' table
    await queryInterface.createTable("CartUsers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add foreign key constraint
    await queryInterface.addConstraint("CartUsers", {
      fields: ["id_user"],
      type: "foreign key",
      name: "CartUsers_id_user_fk",
      references: {
        table: "UserMysqls",
        field: "id",
      },
      onDelete: "CASCADE", // Xóa các bản ghi trong "CartUsers" khi bản ghi tương ứng trong "UserMysqls" bị xóa
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraint
    await queryInterface.removeConstraint("CartUsers", "CartUsers_id_user_fk");

    // Drop the 'CartUsers' table
    await queryInterface.dropTable("CartUsers");
  },
};
