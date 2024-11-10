import icons from 'url:../../img/icons.svg';
import View from './View';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query 🥺. Please try again!';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(recipe => this._generateMarkupRecipe(recipe))
      .join(' ');
  }

  _generateMarkupRecipe(recipe) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${recipe.id === id ? 'preview__link--active' : ''}" href="#${recipe.id}">
        <figure class="preview__fig">
          <img crossorigin="anonymous" src="${recipe.image}" alt="${recipe.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
        </div>
      </a>
    </li>`;
  }
}

export default new ResultsView();
