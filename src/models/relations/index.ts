import { Category, Finance, Goal,Notification,Party,Transaction,User } from '../'

/* User and party relation */
User.hasMany(Party, {
  foreignKey: 'userId',
  as: 'user_party',
})

Party.belongsTo(User, {
  foreignKey: 'userId',
})

/* User and finance relation */
User.hasMany(Finance, {
  foreignKey: 'userId',
  as: 'user_finance',
})

Finance.belongsTo(User, {
  foreignKey: 'userId',
})

/* User and Transaction relation */
User.hasMany(Transaction, {
  foreignKey: 'userId',
  as: 'user_transaction',
})

Transaction.belongsTo(User, {
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

/* User and Notification relation */
User.hasMany(Notification, {
  foreignKey: 'userId',
  as: 'user_Notification',
})

Notification.belongsTo(User, {
  foreignKey: 'userId',
})


/* Category and Finance relation */
Category.hasMany(Finance, {
  foreignKey: 'categoryId',
  as: 'category_finance',
})

Finance.belongsTo(Category, {
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

/* Party and Transaction relation */
Party.hasMany(Transaction, {
  foreignKey: 'transactionId',
  as: 'transaction_party',
})

Transaction.belongsTo(Party, {
  foreignKey: 'transactionId',
})