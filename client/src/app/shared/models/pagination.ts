import {IProduct} from './product';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  data: IProduct[];
}

export class Pagination implements IPagination{
  data: IProduct[] = [];
  pageIndex: number;
  pageSize: number;
  totalItems: number;
}
