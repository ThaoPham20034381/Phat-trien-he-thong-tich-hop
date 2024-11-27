"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the 'Bills' table
    await queryInterface.createTable("Bills", {
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
      id_address: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.STRING,
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
    await queryInterface.addConstraint("Bills", {
      fields: ["id_user"],
      type: "foreign key",
      name: "Bills_id_user_fk",
      references: {
        table: "UserMysqls",
        field: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint("Bills", {
      fields: ["id_address"],
      type: "foreign key",
      name: "Bills_id_address_fk",
      references: {
        table: "Addresses",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    // Remove foreign key constraints
    await queryInterface.removeConstraint("Bills", "Bills_id_user_fk");
    await queryInterface.removeConstraint("Bills", "Bills_id_address_fk");

    // Drop the 'Bills' table
    await queryInterface.dropTable("Bills");
  },
};
