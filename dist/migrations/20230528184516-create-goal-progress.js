'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('goal_progress', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            goalId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'goals',
                    key: 'id',
                },
            },
            endDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            currentAmount: {
                type: Sequelize.INTEGER,
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
    },
    down: async (queryInterface, Sequelize) => {
        // Drop goal_progress table
        await queryInterface.dropTable('goal_progress');
    },
};
