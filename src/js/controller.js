import * as model from './model';
import recipeView from './views/recipeView';
import icons from 'url:../img/icons.svg';

import 'regenerator-runtime/runtime'; //async and await
import 'core-js/stable'; //all other polyfils

const recipeContainer = document.querySelector('.recipe');
const eventToListen = ['load', 'hashchange'];

const renderSpinner = function (parentEl) {
  const markUp = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markUp);
};

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    renderSpinner(recipeContainer);

    // Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //console.log('controller recipe: ', recipe);

    recipeView.render(recipe);
  } catch (error) {
    console.log(`${error} 🚫🚫🚫`);
  }
};

eventToListen.forEach(event => window.addEventListener(event, showRecipe));
