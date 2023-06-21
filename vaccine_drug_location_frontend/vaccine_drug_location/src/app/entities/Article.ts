export class Article {
  public id?: number;
  public name: string;
  public minAge: number;
  public maxAge: number;
  public type: string;
  public stock: number;

  constructor(
    id: number,
    name: string,
    minAge: number,
    maxAge: number,
    type: string,
    stock: number
  ) {
    this.id = id;
    this.name = name;
    this.minAge = minAge;
    this.maxAge = maxAge;
    this.type = type;
    this.stock = stock;
  }
}
