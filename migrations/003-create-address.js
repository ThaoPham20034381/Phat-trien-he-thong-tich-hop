"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_User: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      email_address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      numberPhone: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      address: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
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
    await queryInterface.addConstraint("Addresses", {
      fields: ["id_User"],
      type: "foreign key",
      name: "Addresses_id_User_fk",
      references: {
        table: "UserMysqls",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Addresses", "Addresses_id_User_fk");
    await queryInterface.dropTable("Addresses");
  },
};
