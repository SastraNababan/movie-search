import { ResponseType } from './response-type';
import { DataType } from './data-type';

interface BaseParams {
  type?: DataType;
  y?: number;
  plot?: 'short' | 'long';
  r?: ResponseType;
  v?: number;
}

interface APIByIdParams extends BaseParams {
  i: string;
}

interface APIByTitleParams extends BaseParams {
  t: string;
}

export type APIFetchParams = APIByIdParams | APIByTitleParams;
