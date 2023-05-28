import { SortEnum } from '../enums';

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

export interface PaginationOrderSearchExtend extends PaginationExtend, OrderExtend, SearchExtend { }

export interface CursorPaginationExtend {
  limit?: number;
  first?: number;
  last?: number;
  after?: string;
  before?: string;
}

export interface InputCursorQuery {
  before: string | undefined;
  last: number | undefined;
  after: string | undefined;
  first: number | undefined;
  query: string | undefined;
  sort: SortEnum;
  order: string;
}

export interface CursorInterface {
  cursor: string;
  node: object;
}

export interface CursorInputInterface {
  count: number;
  cursorCount: number;
  rows: any[];
  before: string | undefined;
  limit: number | undefined;
}

export interface PageInfoInterface {
  count: number;
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface InBetweenDateExtend {
  fromDate?: Date;
  toDate?: Date;
}

export interface CursorPaginationOrderSearchExtend extends CursorPaginationExtend, OrderExtend, SearchExtend { }
