'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(
          'expenses',
          'income',
          'others'
        ),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Add index with unique constraint on slug, parentId, and type columns
    await queryInterface.addIndex('categories', ['slug', 'parentId', 'type'], {
      unique: true,
      name: 'categories_slug_parent_id_type',
      where: {
        deletedAt: null,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove index on slug, parentId, and type columns
    await queryInterface.removeIndex('categories', 'categories_slug_parentId_type');

    // Drop categories table
    await queryInterface.dropTable('categories');
  },
};
