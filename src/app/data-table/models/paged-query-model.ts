export interface PagedQueryModel {
  page: number;
  pageSize: number;
  sortExpression: string; // name_desc
  filter: string;
}
