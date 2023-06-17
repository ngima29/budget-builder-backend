/* eslint-disable */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Foods and Drinks",
          slug: "foods-and-drinks",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Transportation",
          slug: "transportation",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Entertainment",
          slug: "entertainment",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Health",
          slug: "health",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Education",
          slug: "education",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Debt Payments",
          slug: "debt-payments",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Housing",
          slug: "housing",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Miscellaneous Expenses",
          slug: "miscellaneous-expenses",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
       // ############## income categories ##################33
        {
          name: "Salary",
          slug: "salary",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Investment Income",
          slug: "investment-income",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Retirement Income",
          slug: "Retirement-Income",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Miscellaneous Income",
          slug: "miscellaneous-income",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Stock Bonus",
          slug: "stock-bonus",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Sell Commodity",
          slug: "sell-commodity",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Sell RealEstate Properties",
          slug: "sell-realestate-properties",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "SIP Return",
          slug: "sip-return",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sell Bonds",
          slug: "sell-bonds",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", [], {});
  },
};
