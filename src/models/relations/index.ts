 import { CashFlow,Category,Goal,GoalProgress,Investment,Loan,User } from '../'

/* User and CashFlow relation */
User.hasMany(CashFlow, {
  foreignKey: 'userId',
  as: 'user_cashFlow',
})

CashFlow.belongsTo(User, {
  foreignKey: 'userId',
})

// /* User and Category relation */
User.hasMany(Category, {
  foreignKey: 'userId',
  as: 'user_category',
})

Category.belongsTo(User, {
  foreignKey: 'userId',
})

/* User and Goal relation */
User.hasMany(Goal, {
  foreignKey: 'userId',
  as: 'user_goal',
})

Goal.belongsTo(User, {
  foreignKey: 'userId',
})

/* User and GoalProgress relation */
User.hasMany(GoalProgress, {
  foreignKey: 'userId',
  as: 'user_goalProgress',
})

GoalProgress.belongsTo(User, {
  foreignKey: 'userId',
})

/* User and Investment relation */
User.hasMany(Investment, {
  foreignKey: 'userId',
  as: 'user_investment',
})

Investment.belongsTo(User, {
  foreignKey: 'userId',
})


/* User and Loan relation */
User.hasMany(Loan, {
    foreignKey: 'userId',
    as: 'user_loan',
  })
  
  Loan.belongsTo(User, {
    foreignKey: 'userId',
  })

/* Category and CashFlow relation */
Category.hasMany(CashFlow, {
  foreignKey: 'categoryId',
  as: 'category_cashFlow',
})

CashFlow.belongsTo(Category, {
  foreignKey: 'categoryId',
})

/* Category and Goal relation */
Category.hasMany(Goal, {
  foreignKey: 'categoryId',
  as: 'category_goal',
})

Goal.belongsTo(Category, {
  foreignKey: 'categoryId',
})

/* Goal and GoalProgress relation */
Goal.hasOne(GoalProgress, {
  foreignKey: 'goalId',
  as: 'goal_goalProgress',
})

GoalProgress.belongsTo(Goal, {
  foreignKey: 'goalId',
})