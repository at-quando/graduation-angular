import { Shop } from './Shop';
import { Property } from './Property';

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  rating?: number;
  number_review?: number;
  shop?: Shop;
  property?: Property[];
}
      