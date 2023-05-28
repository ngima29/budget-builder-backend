import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const CategoryDefs: DocumentNode = gql`
#graphql

 enum CategoryType {
    income 
    expenses 
    others
   }
input InputCategory {
    name: String
    type: CategoryType
}

 type Category {
    id: Int
    name: String
    parentId: Number
    level:Number
    type: CategoryType
}
 
 type SingleCategory {
  message: String
  data: Category
 }

 type PaginationCategories {
  message: String
  data: [Category]
 }

type Message {
 message: String
}
extend type Mutation {
 createCategory(input: InputCategory!): SingleCategory
 updateCategory(id:Int!, input: InputCategory!):SingleCategory
 deleteCategory(id:Int!):Message
}

extend type Query {
    category(id:Int!): SingleCategory
    categories(offset: Int, limit: Int, query: String, sort: SortEnum, order: String): PaginationCategories
}

`;