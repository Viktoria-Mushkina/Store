function getData(url) {
  const data = fetch(url).then(res => res.json())
  return data
}
function addCards(data){
  let products = document.querySelector('.products');
  products.innerHTML= '';
  let currentCategory = '';
  let currentSection = null;
  data.forEach(product => {
      if (product.category != currentCategory) {
        currentCategory = product.category;
        let sectionTitle = document.createElement('h2');
        sectionTitle.className = 'text-h2 section-title';
        sectionTitle.id = currentCategory;
        sectionTitle.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        currentSection = document.createElement('section');
        currentSection.className = 'cards-section';
        products.appendChild(sectionTitle);
        products.appendChild(currentSection);
      }
      let card = document.createElement('div');
      card.className = 'card';
      let img = document.createElement('img');
      img.className = 'card__img';
      img.src = product.image;
      let title = document.createElement('h4');
      title.className = 'text-h4';
      title.textContent = product.title;
      let price = document.createElement('div');
      price.className = 'price';
      price.textContent = product.price.toFixed(2) + ' $';
      let btnCart = document.createElement('i');
      btnCart.className = 'material-icons';
      btnCart.textContent = 'add_shopping_cart';
      btnCart.addEventListener('click', () => {
        addToCart(product);
        alert("The product has been added to the cart");
      });
      currentSection.appendChild(card);
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);
      price.append(btnCart);
  });
}
function filterProducts(products, filters) {
  if (!filters || (filters.categories.length === 0 && !filters.minPrice && !filters.maxPrice)) {
    return products;
  }
  return products.filter(product => {
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category.toLowerCase());
    const minPrice = parseFloat(filters.minPrice) || 0;
    const maxPrice = parseFloat(filters.maxPrice) || Infinity;
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    return categoryMatch && priceMatch;
  });
}

function addToCart(product) {
  const cart = cartStorage.getCart();
  const existingItem = cart.find(item => item.id == product.id);
  if (existingItem) existingItem.quantity += 1;
  else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  cartStorage.saveCart(cart);
  console.log('Current cart:', cart);
}

// Добавление товара в корзину
const cartStorage = {
  saveCart: (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  },
  getCart: () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
};

function createTable(cart){
  let table = `
  <table>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>`;
  let suma = 0;
  for(let i = 0; i < cart.length; i++){
    table += `
    <tr>
      <td>
        <div class="product__container">
          <img src="${cart[i].image}" alt="${cart[i].title}">
          <h2 class="text-h2">${cart[i].title}</h2>
        </div>
      </td>
      <td>
        <div class="quantity">
          <i class="material-icons cart-btn" data-action="remove" data-id="${cart[i].id}">remove_circle_outline</i>
          <span class="quantity-value">${cart[i].quantity}</span>
          <i class="material-icons cart-btn" data-action="add" data-id="${cart[i].id}">add_circle_outline</i>
        </div>
      </td>
      <td>${(cart[i].price * cart[i].quantity).toFixed(2)} $</td>
    </tr>`;
    suma += cart[i].price * cart[i].quantity;
  }
  table += '</table>';
  let tableContainer = document.querySelector('.table');
  tableContainer.innerHTML = table;
  let sumContainer = document.querySelector('.total_sum');
  sumContainer.innerHTML = `<h3 class="text-h3">Total amount: ${suma.toFixed(2)} $</h3>`;
}

function updateCartQuantity(productId, change) {
  let cart = cartStorage.getCart();
  const productIndex = cart.findIndex(item => item.id == productId);
  if (productIndex != -1) {
    cart[productIndex].quantity += change;
    cart = cart.filter(item => item.quantity > 0);
    cartStorage.saveCart(cart);
    createTable(cart);
  }
}