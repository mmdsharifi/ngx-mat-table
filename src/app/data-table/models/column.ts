export interface Column {
  field: string;
  title: string;
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'date'
    | 'time'
    | 'enum'
    | 'image'
    | 'file'
    | 'link';
  descriptor?: ColumnDescriptor;
  sortable: boolean;
  filterable: boolean;
  width: number;
}
// tslint:disable-next-line:no-empty-interface
export interface ColumnDescriptor {}

export interface EnumColumnDescriptor extends ColumnDescriptor {
  enum: string;
}
