import * as model from './model';
import recipeView from './views/recipeView';
import searchView from '../../.src/js/views/searchView';
import resultsView from './views/resultsView';

import 'core-js/stable'; //all other polyfils
import 'regenerator-runtime/runtime'; //async and await

if (module.hot) {
  module.hot.accept();
}

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

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    const queryResults = model.state.search.results;
    console.log('Controller search results: ', queryResults);
    const resusltsPP = model.getSearchResultsPage(3);
    console.log('Page results: ', resusltsPP);
    resultsView.render(resusltsPP);
  } catch (error) {
    console.log(error.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
