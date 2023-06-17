 import { CashFlow,Category,Goal,Investment,Loan,User } from '../'

/* User and CashFlow relation */
User.hasMany(CashFlow, {
  foreignKey: 'userId',
  as: 'cashFlow',
})

CashFlow.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

// /* User and Category relation */
User.hasMany(Category, {
  foreignKey: 'userId',
  as: 'category',
})

Category.belongsTo(User, {
  foreignKey: 'userId',
  as:'user'
})

/* User and Goal relation */
User.hasMany(Goal, {
  foreignKey: 'userId',
  as: 'goal',
})

Goal.belongsTo(User, {
  foreignKey: 'userId',
  as:'user'
})



/* User and Investment relation */
User.hasMany(Investment, {
  foreignKey: 'userId',
  as: 'investment',
})

Investment.belongsTo(User, {
  foreignKey: 'userId',
  as:'user'
})


/* User and Loan relation */
User.hasMany(Loan, {
    foreignKey: 'userId',
    as: 'loan',
  })
  
  Loan.belongsTo(User, {
    foreignKey: 'userId',
    as:'user'
  })

/* Category and CashFlow relation */
Category.hasMany(CashFlow, {
  foreignKey: 'categoryId',
  as: 'cashFlow',
})

CashFlow.belongsTo(Category, {
  foreignKey: 'categoryId',
  as:'categories'
})

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
Goal.hasOne(CashFlow, {
  foreignKey: 'goalId',
  as: 'cashFlow',
})
CashFlow.belongsTo(Goal, { 
  foreignKey: 'goalId', 
  as:'goals',
});