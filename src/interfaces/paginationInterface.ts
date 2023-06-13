import { SortEnum} from '../enums'

export interface PaginationExtend {
  offset: number;
  limit: number;
}

export interface OrderExtend {
  sort: SortEnum;
  order: string;
}

export interface SearchExtend {
  query?: string;
}
export interface InBetweenDateExtend {
  fromDate?: Date;
  toDate?: Date;
}

export interface PaginationOrderSearchExtend extends PaginationExtend, OrderExtend, SearchExtend { }


