import { Article } from './article.model';
import { Location } from './location.model';

export interface Inventory {
  id?: number;
  location: Location;
  article: Article;
  quantity: number;
}
