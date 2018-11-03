import { Filter } from './filter';

export interface LookupFilter extends Filter {
  endpoint: string;
  multiple: boolean;
}
