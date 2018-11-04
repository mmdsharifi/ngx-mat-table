export interface FormFilter {
  field: string;
  title: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'enum' | 'lookup';
  hint: string;
}
