"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
/* User and CashFlow relation */
__1.User.hasMany(__1.CashFlow, {
    foreignKey: 'userId',
    as: 'cashFlow',
});
__1.CashFlow.belongsTo(__1.User, {
    foreignKey: 'userId',
    as: 'user'
});
// /* User and Category relation */
__1.User.hasMany(__1.Category, {
    foreignKey: 'userId',
    as: 'category',
});
__1.Category.belongsTo(__1.User, {
    foreignKey: 'userId',
    as: 'user'
});
/* User and Goal relation */
__1.User.hasMany(__1.Goal, {
    foreignKey: 'userId',
    as: 'goal',
});
__1.Goal.belongsTo(__1.User, {
    foreignKey: 'userId',
    as: 'user'
});
/* User and Investment relation */
__1.User.hasMany(__1.Investment, {
    foreignKey: 'userId',
    as: 'investment',
});
__1.Investment.belongsTo(__1.User, {
    foreignKey: 'userId',
    as: 'user'
});
/* User and Loan relation */
__1.User.hasMany(__1.Loan, {
    foreignKey: 'userId',
    as: 'loan',
});
__1.Loan.belongsTo(__1.User, {
    foreignKey: 'userId',
    as: 'user'
});
/* Category and CashFlow relation */
__1.Category.hasMany(__1.CashFlow, {
    foreignKey: 'categoryId',
    as: 'cashFlow',
});
__1.CashFlow.belongsTo(__1.Category, {
    foreignKey: 'categoryId',
    as: 'categories'
});
/* Category and Goal relation */
// Category.hasMany(Goal, {
//   foreignKey: 'categoryId',
//   as: 'goal',
// })
// Goal.belongsTo(Category, {
//   foreignKey: 'categoryId',
//   as: 'category'
//})
//  Goal and CashFlow  relation
__1.Goal.hasOne(__1.CashFlow, {
    foreignKey: 'goalId',
    as: 'cashFlow',
});
__1.CashFlow.belongsTo(__1.Goal, {
    foreignKey: 'goalId',
    as: 'goals',
});
