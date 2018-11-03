import { Column } from './column';

export interface EnumColumn extends Column {
  enum: string; // TaskStatus
}
