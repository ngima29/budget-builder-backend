import { InformationEvent } from 'http';
import { defaultOrder, defaultSort, pgMaxLimit, pgMinLimit } from '../../config';
import {
  ContextInterface,
  InputCashFlowInterface,
  ArgsCashFlowInterface,
  InBetweenDateExtend,
} from '../../interfaces';
import { Guard, Validator } from '../../middlewares';
import {
    createCashFlow,updateCashFlow
} from '../../validators';
import {SuccessResponse} from "../../helpers"
import {CashFlowService, CategoryService} from "../../services"
import {CategoryTypeEnum} from '../../enums'

export const cashFlowResolvers:any = { 
    Mutation: {
    createCashFlow: async (
      parent: ParentNode,
      args: { input: InputCashFlowInterface },
      contextValue: ContextInterface,
      info: InformationEvent,
    ) => {
      const user = Guard.grant(contextValue.user)
      Validator.check(createCashFlow, args.input);
      args.input.userId = user.id;
      const categoryExist = await new CategoryService().findOne(args.input.category);
      console.log(categoryExist)
      if(!categoryExist) throw new Error(`Category  ${args.input.category} does not exist`);
      if( args.input.type !==  categoryExist.type) throw new Error(`Category  ${args.input.category} is  ${categoryExist.type} types`);
      args.input.category = categoryExist.id
      const data = await new CashFlowService().create(args.input);
      return SuccessResponse.send({
        message: 'Category  is successfully created.',
        data: data,
      });
    },

    updateCashFlow: async (
        parent: ParentNode,
        args: {  id: number; input: InputCashFlowInterface },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
       const user= Guard.grant(contextValue.user);
        Validator.check(updateCashFlow, args.input);
        args.input.userId = user.id;
        const categoryExist = await new CategoryService().findOne(args.input.category);
        if(!categoryExist) throw new Error(`Category  ${args.input.category} does not exist`);
        if( args.input.type !==  categoryExist.type) throw new Error(`Category  ${args.input.category} is  ${categoryExist.type} types`);
        args.input.category = categoryExist.id
        const data = await new CashFlowService().updateOne(args.id,args.input);
        return SuccessResponse.send({
          message: 'Category  is successfully Updated.',
          data: data,
        });
      },
      
    deleteCashFlow: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
         await new CashFlowService().deleteOne(args.id);
        return SuccessResponse.send({
          message: 'Category is successfully Deleted.'
        });
      }

},
Query: {
    cashFlow: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        const data= await new CashFlowService().findByPk(args.id);
        return SuccessResponse.send({
          message: 'Category is successfully Fetched.',
          data: data
        });
      },
    cashFlows: async (
        parent: ParentNode,
        args: ArgsCashFlowInterface,
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        let { offset, limit, query, sort, order, type } = args;
        offset = offset && offset > 0 ? offset - 1 : 0;
        limit = limit ? limit : pgMinLimit;
        limit = Math.min(limit, pgMaxLimit);
        query = query ? query : undefined;
        order = order ? order : defaultOrder;
        sort = sort ? sort : defaultSort;
        type = type ? type : undefined;
      
  
        const { count, rows: data } = await new CashFlowService().findAndCountAll({
          offset,
          limit,
          query,
          sort,
          order,
          type,
        });
  
        return SuccessResponse.send({
          message: 'Category  list is successfully fetched.',
          data: data,
          count: count,
        });
      },
  cashFlowsCountSummaries:  async (
    parent: ParentNode,
    args: InBetweenDateExtend,
    contextValue: ContextInterface,
    info: InformationEvent,
  ) => {
    const user = Guard.grant(contextValue.user)
    const income = await new CashFlowService().sum({userId:user.id, type:CategoryTypeEnum.income,fromDate: args.fromDate, toDate: args.toDate });
    const expenses = await new CashFlowService().sum({userId:user.id, type:CategoryTypeEnum.expenses,fromDate: args.fromDate, toDate: args.toDate });  
    
    return SuccessResponse.send({
      message: 'Cash Flow counts is successfully fetched.',
      data: {
        income:income,
        expenses:expenses,
        total: income+expenses
      }
    })
 
  }
}
}