import { Recipe } from './recipe';

const recipesWP = [];
fetch('https://simodecl.cmsdevelopment.be/wp-json/wp/v2/recipe').then(res => res.json).then(res => console.log(res.json));
console.log(recipesWP);

export const RECIPES: Recipe[] = recipesWP;
