"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
/* User and CashFlow relation */
__1.User.hasMany(__1.CashFlow, {
    foreignKey: 'userId',
    as: 'user_cashFlow',
});
__1.CashFlow.belongsTo(__1.User, {
    foreignKey: 'userId',
});
// /* User and Category relation */
__1.User.hasMany(__1.Category, {
    foreignKey: 'userId',
    as: 'user_category',
});
__1.Category.belongsTo(__1.User, {
    foreignKey: 'userId',
});
/* User and Goal relation */
__1.User.hasMany(__1.Goal, {
    foreignKey: 'userId',
    as: 'user_goal',
});
__1.Goal.belongsTo(__1.User, {
    foreignKey: 'userId',
});
/* User and Investment relation */
__1.User.hasMany(__1.Investment, {
    foreignKey: 'userId',
    as: 'user_investment',
});
__1.Investment.belongsTo(__1.User, {
    foreignKey: 'userId',
});
/* User and Loan relation */
__1.User.hasMany(__1.Loan, {
    foreignKey: 'userId',
    as: 'user_loan',
});
__1.Loan.belongsTo(__1.User, {
    foreignKey: 'userId',
});
/* Category and CashFlow relation */
__1.Category.hasMany(__1.CashFlow, {
    foreignKey: 'categoryId',
    as: 'category_cashFlow',
});
__1.CashFlow.belongsTo(__1.Category, {
    foreignKey: 'categoryId',
});
/* Category and Goal relation */
// Category.hasMany(Goal, {
//   foreignKey: 'categoryId',
//   as: 'category_goal',
// })
// Goal.belongsTo(Category, {
//   foreignKey: 'categoryId',
//})
//  Goal and CashFlow  relation
__1.Goal.hasOne(__1.CashFlow, {
    foreignKey: 'goalId',
    as: 'goal_cashFlow',
});
__1.CashFlow.belongsTo(__1.Goal, {
    foreignKey: 'goalId',
});
