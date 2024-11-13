import icons from 'url:../../img/icons.svg';
import View from './View';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find recipe and bookmark.';
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
      <a class="preview__link" href="#23456">
        <figure class="preview__fig">
          <img src="${recipe.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__name">
            ${recipe.description}
          </h4>
          <p class="preview__publisher">${recipe.title}</p>
        </div>
      </a>
    </li>`;
  }
}

export default new BookmarksView();
