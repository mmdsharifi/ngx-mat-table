import { Column } from './column';

export interface EnumColumn extends Column {
  /**
   * enumeration name like: TaskStatus
   */
  enum: string;
}
