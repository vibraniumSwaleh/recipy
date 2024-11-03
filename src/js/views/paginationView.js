import View from './View';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      handler(goTo);
    });
  }

  _nextButton(currentPage) {
    return `
    <button data-goto='${
      currentPage + 1
    }' class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  _prevButton(currentPage) {
    return `
    <button data-goto='${
      currentPage - 1
    }' class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resusltsPerPage
    );

    // Page, and other pages
    if (curPage === 1 && numPages > 1) {
      return this._nextButton(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._prevButton(curPage);
    }

    // Other page
    if (curPage < numPages) {
      return this._prevButton(curPage) + this._nextButton(curPage);
    }

    return ''; // 1 page only
  }
}

export default new paginationView();
