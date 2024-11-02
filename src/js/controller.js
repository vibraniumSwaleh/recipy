import * as model from './model';
import recipeView from './views/recipeView';
import icons from 'url:../img/icons.svg';
import searchView from '../../.src/js/views/searchView';

import 'regenerator-runtime/runtime'; //async and await
import 'core-js/stable'; //all other polyfils

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log('Controller recipe: ', model.state);

    recipeView.render(recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function (query) {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    
    await model.loadSearchResults(query);
    console.log('Controller search: ', model.state.search.results);
  } catch (error) {
    console.log(error.message);
  }
};

controlSearchResults('pizza');

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
