import { Article } from './article';

const articlesWP = [];
fetch('http://localhost/jsonapi/node/article').then(res => res.json).then(res => console.log(res.json));
console.log(articlesWP);

export const ARTICLES: Article[] = articlesWP;
