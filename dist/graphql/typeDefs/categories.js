"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.CategoryDefs = (0, graphql_tag_1.default) `
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
    slug: String
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


extend type Mutation {
 createCategory(input: InputCategory!): SingleCategory
 updateCategory(id:Int!, input: InputCategory!):SingleCategory
 deleteCategory(id:Int!):Message
}

extend type Query {
    category(id:Int!): SingleCategory
    categories(offset: Int, limit: Int, query: String, sort: SortEnum, order: String, type: CategoryType): PaginationCategories
}

`;
