import { Article } from './Article';

export class Line {
  id?: number;
  lineNumber: number;
  type: string;
  article: Article;
  quantity: number;
  location: Location;

  constructor(
    lineNumber: number,
    type: string,
    article: Article,
    quantity: number,
    location: Location
  ){
    this.lineNumber = lineNumber;
    this.type = type;
    this.article = article;
    this.quantity = quantity;
    this.location = location;
  }
}
