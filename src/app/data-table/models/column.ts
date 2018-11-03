export interface Column {
  field: string;
  title: string;
  type: 'string'|'number'|'boolean'|'date'|'time'|'enum';
  sortable: boolean;
  filterable: boolean;
}
