function renderCatalog(rootElement, products) {
  const catalog = document.createElement('div');

  catalog.classList.add('catalog');

  for (let product of products) {
    createProductCard(product);
  }

  /**
   * JSDOC
   * @param {Object} product 
   * @param {string} product.title 
   * @param {number} product.price 
   * @param {number} product.discount 
   */
  function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.insertAdjacentHTML('beforeend', `
    <div class="product-card__header">
      <div class="product-card__label">
        Акція
      </div>
    </div>
    <div class="product-card__content">
      <img src="./assets/images/image 1@2x.png" alt="phone image" class="product-card__hero-image">
    </div>
    <div class="product-card__footer">
      <h2 class="product-card__title">${product.title}</h2>
      <div class="product-card__price ${product.discount ? 'product-card__price_discount' : ''}">
        <div class="product-card__label-regular">${product.price}</div>
        ${product.discount ? '<div class="product-card__label-current">' + product.discount + '</div>' : ''}
      </div>
      <button class="product-card__action-button">Купити</button>
    </div>
`);

    catalog.appendChild(productCard);
    rootElement.appendChild(catalog);
  }
}
const data = [
  {
    title: 'Samsung galaxy s3',
    price: 700,
    currency: 'USD',
    discount: 500,
  },
  {
    title: 'Iphone 12',
    price: 800,
    currency: 'USD',
    discount: 750,
  },
  {
    title: 'Iphone 11',
    price: 400,
    currency: 'USD',
  },
  {
    title: 'GOOLGE PHONE',
    price: 900,
    currency: 'USD',
    discount: 750,
  },
  {
    title: 'GOOLGE PHONE 2',
    price: 900,
    currency: 'USD',
    discount: 750,
  }
];
renderCatalog(document.querySelector('body'), data)


