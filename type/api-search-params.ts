import { DataType } from './data-type';
import { ResponseType } from './response-type';

export interface APISearchParams {
  s: string;
  type?: DataType;
  y?: number;
  r?: ResponseType;
  page?: number;
  v?: number;
}
