import { Discount } from './Discount';
export interface Property {
  id?: number;
  discount?: Discount;
  color?: string;
  size?: string;
  storage?: string;
  price?: number;
}
