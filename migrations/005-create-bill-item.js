"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the 'BillItems' table
    await queryInterface.createTable("BillItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_Bill: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug_Product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quanlity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price_per_unit: {
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
    await queryInterface.addConstraint("BillItems", {
      fields: ["id_Bill"],
      type: "foreign key",
      name: "BillItems_id_Bill_fk",
      references: {
        table: "Bills",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    // Remove foreign key constraint
    await queryInterface.removeConstraint("BillItems", "BillItems_id_Bill_fk");

    // Drop the 'BillItems' table
    await queryInterface.dropTable("BillItems");
  },
};
