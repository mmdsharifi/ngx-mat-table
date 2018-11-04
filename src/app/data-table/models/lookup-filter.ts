import { FormFilter } from './form-filter';

export interface LookupFilter extends FormFilter {
  endpoint: string;
  multiple: boolean;
}


