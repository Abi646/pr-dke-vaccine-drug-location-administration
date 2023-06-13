import { ArticleType } from '../models/article.model';

export class Article {
  id?: number;
  name: string;
  type: ArticleType;
  minAge: number;
  maxAge: number;

  constructor(name: string, type: ArticleType, minAge: number, maxAge: number) {
    this.name = name;
    this.type = type;
    this.minAge = minAge;
    this.maxAge = maxAge;
  }
}
