import { Shop } from './Shop';
import { Property } from './Property';

export interface ProductOrder {
  id?: number;
  name?: string;
  // description?: string;
  image?: string;
  // rating?: number;
  quantity?: number;
  // number_review?: number;
  shop?: Shop;
  properties?: Property[];
}
