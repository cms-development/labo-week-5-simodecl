export class Article {
  id: number;
  type = 'node--article';
  attributes: Attributes;
}

export class Attributes {
  title: string;
  body: Body;
}

export class Body {
  value: string;
  format = 'plain_text';
  summary = 'Summary of this article.';
}
