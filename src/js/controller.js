import * as model from './model';
import recipeView from './views/recipeView';
import icons from 'url:../img/icons.svg';

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
    //console.log('controller recipe: ', recipe);

    recipeView.render(recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
