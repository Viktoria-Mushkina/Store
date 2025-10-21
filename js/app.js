const baseUrl = 'https://mock.shop/api';
function getData(url, options) {
  // const data = fetch(url).then(res => res.json())
  // return data
  
  const data = new Promise((res,rej) => {
    const dataArray = [
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      price: 29.99,
      description: "Soft and breathable 100% cotton t-shirt for everyday wear.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Black", "Heather Gray"],
      image: "../img/T-shirt.jpg",
      gender: "Unisex"
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 79.99,
      description: "Modern slim fit jeans with stretch for perfect comfort and style.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Blue Denim", "Black"],
      image: "../img/T-shirt.jpg",
      gender: "Men"
    },
    {
      id: 3,
      name: "Floral Summer Dress",
      price: 59.99,
      description: "Light and beautiful floral dress perfect for summer occasions.",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Floral Print", "Navy Blue"],
      image: "../img/T-shirt.jpg",
      gender: "Women"
    },
    {
      id: 4,
      name: "Oversized Hoodie",
      price: 49.99,
      description: "Comfortable oversized hoodie made from premium French terry.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy", "Cream", "Forest Green"],
      image: "../img/T-shirt.jpg",
      gender: "Unisex"
    },
    {
      id: 5,
      name: "Business Dress Shirt",
      price: 89.99,
      description: "Premium non-iron dress shirt for professional appearance.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Light Blue", "Pale Pink"],
      image: "../img/T-shirt.jpg",
      gender: "Men"
    },
    {
      id: 6,
      name: "A-Line Midi Skirt",
      price: 45.99,
      description: "Elegant A-line midi skirt that flatters every figure.",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Black", "Navy", "Burgundy"],
      image: "../img/T-shirt.jpg",
      gender: "Women"
    },
    {
      id: 7,
      name: "Cargo Pants",
      price: 65.99,
      description: "Utility cargo pants with multiple pockets for casual style.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Olive Green", "Black", "Beige"],
      image: "../img/T-shirt.jpg",
      gender: "Unisex"
    },
    {
      id: 8,
      name: "Knit Sweater",
      price: 75.99,
      description: "Warm and cozy knit sweater for cold weather.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Cream", "Navy", "Burgundy"],
      image: "../img/T-shirt.jpg",
      gender: "Women"
    },
    {
      id: 9,
      name: "Leather Jacket",
      price: 199.99,
      description: "Genuine leather jacket for a bold and stylish look.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Brown"],
      image: "../img/T-shirt.jpg",
      gender: "Men"
    },
    {
      id: 10,
      name: "Sports Leggings",
      price: 35.99,
      description: "High-waisted leggings perfect for workouts and casual wear.",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Black", "Charcoal", "Dark Green"],
      image: "../img/T-shirt.jpg",
      gender: "Women"
    }
  ];
  const sortedArray = dataArray.sort((a, b) => {
    const order = { 'Women': 1, 'Men': 2, 'Unisex': 3 };
    return order[a.gender] - order[b.gender];
  });
    setTimeout(() => {
      res(sortedArray)
    })
  })
  
  return data
}
function addCards(data){
  let products = document.querySelector('.products');
  products.innerHTML= '';
  let currentGender = '';
  let currentSection = null;
  data.forEach(product => {
      if (product.gender !== currentGender) {
          currentGender = product.gender;
          let sectionTitle = document.createElement('h2');
          sectionTitle.className = 'text-h2 section-title';
          
          switch (product.gender) {
              case 'Women': sectionTitle.textContent = 'Women'; sectionTitle.id = 'women'; break;
              case 'Men': sectionTitle.textContent = 'Men'; sectionTitle.id = 'men'; break;
              case 'Unisex': sectionTitle.textContent = 'Unisex'; sectionTitle.id = 'unisex'; break;
          }
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
      title.textContent = product.name;

      let price = document.createElement('div');
      price.className = 'price';
      price.textContent = product.price;

      let btnCart = document.createElement('i');
      btnCart.className = 'material-icons';
      btnCart.textContent = 'add_shopping_cart';

      currentSection.appendChild(card);
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);
      price.append(btnCart);
  });
}
// Добавляем карточки
getData().then((data) => {
  // console.log(data)
  addCards(data);
});
// Выбор фильтров
let filters = {gender: [] , sizes: []};
let btnDone = document.querySelectorAll('.filter-btn');
btnDone.forEach(btn => {
  btn.addEventListener('click', () => {
    let btnText = btn.parentElement.querySelector('.catalog span').textContent;
    
    let filterType = '';
    let filterValue = btnText;
    if (['Women', 'Men', 'Unisex'].includes(btnText)) {
      filterType = 'gender';
    } else {
      filterType = 'sizes';
      filterValue = btnText.toUpperCase();
    }

    if (btn.classList.contains('done')) {
      btn.classList.remove('done');
      filters[filterType] = filters[filterType].filter(text => text != filterValue);
    }
    else {
      btn.classList.add ('done');
      if(!filters[filterType].includes(filterValue)) filters[filterType].push(filterValue);
    };

    let filterProducts = (products, filters) => {
      if (!filters || (filters.gender.length === 0 && filters.sizes.length == 0)) return products;
      return products.filter(product => {
        const genderMatch = filters.gender.length == 0 || filters.gender.includes(product.gender);
        const sizeMatch = filters.sizes.length == 0 || product.sizes.some(size => filters.sizes.includes(size));
        return genderMatch && sizeMatch;
      });
    };

    let btnSaveFilters = document.querySelector('.saveFilters-btn');
    btnSaveFilters.addEventListener('click', () => {
        getData().then((data) => {
          addCards(filterProducts(data, filters));
        });
      });
  })
});