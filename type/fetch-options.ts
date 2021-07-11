import { PlotType } from './plot-type';
import { DataType } from './data-type';

export interface FetchOptions {
  type?: DataType;
  year?: number;
  plot?: PlotType;
}
