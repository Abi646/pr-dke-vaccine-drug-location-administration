export interface Article {
  id?: number;
  name: string;
  type: ArticleType;
  minAge: number;
  maxAge: number;
}

export enum ArticleType {
  Vaccine = 'Vaccine',
  Drug = 'Drug'
}
