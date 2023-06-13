import { Location } from './location.model';
import { Article } from './article.model';

export interface Line {
  id?: number;
  location: Location;
  dedicatedArticle: Article;
}
