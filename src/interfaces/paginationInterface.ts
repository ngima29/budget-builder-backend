export interface PaginationExtend {
  offset?: number
  limit?: number
}

export interface OrderExtend {
  sort?: string
  order?: string
}

export interface SearchExtend {
  query?: string
}

export interface PaginationOrderSearchExtend
  extends PaginationExtend,
    OrderExtend,
    SearchExtend {}
