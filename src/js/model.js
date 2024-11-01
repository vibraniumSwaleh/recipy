import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper';

//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    let {
      data: { recipe },
    } = data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    //console.log('Model recipe: ', state.recipe);
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
  } catch (error) {
    throw error;
  }
};

loadSearchResults('pizza');
