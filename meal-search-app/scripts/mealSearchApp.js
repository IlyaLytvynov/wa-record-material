const ROOT_CLASS_NAME = 'meals-search';
const CLASS_NAMES = {
  FORM_ROOT: 'search-form',
  FORM_ROW: 'search-form__row'
};
const FILTERS = {
  CATEGORY: 'category',
  INGREDIENTS: 'ingredients'
};

const FORM_INPUTS_NAME = {
  QUERY: 'query',
}

const filterInputTemplate = (options) => {
  const id = Date.now() + options.name;
  return `
    <label class="search-form__filter" for="${id}">
      ${options.title}
      <input
        ${options.checked ? 'checked' : ''}
        id="${id}"
        type="radio"
        name="${options.name}"
        value="${options.value}"
      />
    </label>
  `;
};
/**
 * 
 * @param {Array} filters  [{value: string, name: string, title: string}]
 */
const createFilters = (filters) => {
  const row = document.createElement('div');

  row.classList.add(CLASS_NAMES.FORM_ROW);

  let content = '';

  for (let filter of filters) {
    content += filterInputTemplate(filter);
  }

  row.innerHTML = content;
  return row;
};

const searchInputTemplate = ({ name, placeholder, onInput }) => {
  const root = document.createElement('div');
  const input = document.createElement('input');
  input.name = name;
  input.placeholder = placeholder;
  input.classList.add('search-form__field');

  if (onInput) {
    input.addEventListener('input', onInput);
  }

  root.appendChild(input);
  return root;
};
/**
 * 
 * @param {Object} options 
 * @param {string} options.title 
 * @param {function} options.onClick
 * @returns 
 */
const createBtn = (options) => {
  const button = document.createElement('button');
  button.innerHTML = options.title;
  if (options.onClick) {
    button.addEventListener('click', (e) => {
      options.onClick(e);
    });
  }
  return button;
};

const searchForm = ({ onSubmit }) => {
  const filters = [{
    title: 'Category',
    name: 'searchFilter',
    value: FILTERS.CATEGORY,
    checked: true
  },
  {
    title: 'Ingredients',
    name: 'searchFilter',
    value: FILTERS.INGREDIENTS
  }];
  const formRoot = document.createElement('form');
  const input = searchInputTemplate({ placeholder: 'Enter query', name: FORM_INPUTS_NAME.QUERY, onInput: (e) => { console.log('Chnaged', e); } });
  const filtersRadio = createFilters(filters);
  const button = createBtn({ title: 'Search' });

  formRoot.classList.add(CLASS_NAMES.FORM_ROOT);
  formRoot.appendChild(input);
  formRoot.appendChild(filtersRadio);
  formRoot.appendChild(button);
  formRoot.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit(e);
  });
  return formRoot;
};
const BASE_URL = `https://themealdb.com/api/json/v1/1`;
const CATEGORY_SEARCH_URL = 'www.themealdb.com/api/json/v1/1/categories.php';

const getCategoryFilterUrl = (query) => {
  console.log(query);
  return `${BASE_URL}/filter.php?c=${query}`;
};

const getIngredientsFilterUrl = (query) => {
  return `${BASE_URL}/filter.php?i=${query}`;
}

const makeSearch = async (url) => {
  const response = await fetch(url);
  if (response.status !== 200) {
    throw Error(e.message);
  }

  const data = await response.json();
  return data.meals;
};

const submitHandler = async (e) => {
  const formData = new FormData(e.target);
  let createUrlFn = null;

  switch (formData.get('searchFilter')) {
    case FILTERS.CATEGORY:
      createUrlFn = getCategoryFilterUrl;
      break;
    case FILTERS.INGREDIENTS:
      createUrlFn = getIngredientsFilterUrl;
      break;
    default:
      createUrlFn = null;
  }
  const data = await makeSearch(createUrlFn(formData.get(FORM_INPUTS_NAME.QUERY)));
  return data;
};


const renderList = (root, list) => {
  root.innerHTML = ''
  let content = '<ul class="meals-search__list">';
  
  for(let {strMeal, strMealThumb} of list) {
    content += `<li class="meals-search__list-item">
      <div class="meals-search__image image-container"><img src="${strMealThumb}" /></div>
      <h4>${strMeal}</h4>
    </li>`
  }
  content += '</ul>';
  root.innerHTML = content;
}

export const MealSearchApp = (rootContainer = document.querySelector('body')) => {
  const listContainer = document.createElement('div');
  let mealsList = [];

  const renderMealsList = () => {
    renderList(listContainer, mealsList);
  }
  const form = searchForm({
    onSubmit: async (e) => {
      const data = await submitHandler(e);
      mealsList = data;
      renderMealsList();
    }
  });
  rootContainer.classList.add(ROOT_CLASS_NAME);
  renderMealsList()
  rootContainer.appendChild(form);
  rootContainer.appendChild(listContainer);
};