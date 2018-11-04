export interface PagedQueryModel {
  page: number;
  pageSize: number;
  /**
   * expression of sorting. example: name_asc
   */
  sort: string;
  filter: Filter;
}

export interface Filter {
  field: string;
  operator:
    | 'oq'
    | 'neq'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte'
    | 'startwith'
    | 'endswith'
    | 'contains'
    | 'doesnotcontain';
  value: any;
  logic: 'and' | 'or';
  filters: Filter[];
}
