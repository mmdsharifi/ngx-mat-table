export interface Filter {
  field: string;
  title: string;
  type: 'string'|'number'|'boolean'|'date'|'time'|'enum'|'lookup';
  hint: string;
}
