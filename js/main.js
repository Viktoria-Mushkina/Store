const url = 'https://fakestoreapi.com/products';
// Добавляем карточки
getData(url).then((data) => {
  addCards(data);
});

let filters = {categories: [] , minPrice: 0, maxPrice: 0};
// Выбор категорий
let btnDone = document.querySelectorAll('.filter-btn');
btnDone.forEach(btn => {
  btn.addEventListener('click', () => {
    let btnText = btn.parentElement.querySelector('span').textContent;
    if (btn.classList.contains('done')) {
      btn.classList.remove('done');
      filters.categories = filters.categories.filter(text => text != btnText);
    }
    else {
      btn.classList.add ('done');
      if(!filters.categories.includes(btnText)) filters.categories.push(btnText);
    };
  })
});

// Сохранение фильтров
let btnSaveFilters = document.querySelector('.saveFilters-btn');
btnSaveFilters.addEventListener('click', () => {
    filters.minPrice = document.getElementById('from_price').value;
    filters.maxPrice = document.getElementById('to_price').value;
    getData(url).then((data) => {
      addCards(filterProducts(data, filters));
    });
});
