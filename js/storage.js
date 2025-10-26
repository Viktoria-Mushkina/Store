

// // Доваление товаров
// let btnAdd = document.querySelectorAll('#btnAdd');
// btnAdd.forEach(btn => {
//   btn.addEventListener('click', () => {
//     if (localStorage.getItem('cart') !== null){
//       let cart = cartStorage.getCart();
//       for(let i = 0; i < cart.length; i++){
//         cart[i].quantity += 1;
//         createTable(cart);
//       }
      
//     }
//   }) 
// })


// Добавление / удаление товаров
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-btn')) {
    const productId = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;   
    if (action == 'add') {
      updateCartQuantity(productId, 1);
    } else if (action == 'remove') {
      updateCartQuantity(productId, -1);
    }
  }
});

// Добавляем товары из корзины
if (localStorage.getItem('cart') !== null){
  let cart = cartStorage.getCart();
  createTable(cart);
}