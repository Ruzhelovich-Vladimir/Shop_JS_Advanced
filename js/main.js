
class ProductList{
  #goods; // Инкапсулированное свойство
  #allProducts;
  /* Список продуктов */
  constructor(container='.products') {
    this.container = container;
    this.#goods = [];
    this.#allProducts =[];
    this.#fetchGoods();
    this.#render();
  }

  #fetchGoods(){
    this.#goods = [
        { id: 1, title: 'Notebook', price: 20000 },
        { id: 2, title: 'Mouse', price: 1500 },
        { id: 3, title: 'Keyboard', price: 5000 },
        { id: 4, title: 'Gamepad', price: 4500 },
        { id: 5, title: 'Notebook', price: 20000 },
        { id: 6, title: 'Mouse', price: 1500 },
        { id: 7, title: 'Keyboard', price: 5000 },
        { id: 8, title: 'Gamepad', price: 4500 },
        { id: 9, title: 'Notebook', price: 20000 },
        { id: 10, title: 'Mouse', price: 1500 },
        { id: 11, title: 'Mouse', price: 1500 },
        { id: 12, title: 'Gamepad', price: 4500 },
        { id: 13, title: 'Notebook', price: 20000 },
        { id: 14, title: 'Mouse', price: 1500 },
        { id: 15, title: 'Keyboard', price: 5000 },
        { id: 16, title: 'Gamepad', price: 4500 },
    ];
  }

  #render(){
    const container = document.querySelector(this.container);
    for (let product  of this.#goods){
      const productObject = new ProductItem(product);
      this._allProducts.push(productObject);
      container.insertAdjacentHTML('beforeend', productObject.getHTMLString())
    }
  }
}

class ProductItem{
  constructor(product, img='img/200x150.png') {
    this.title  = product.title;
    this.price  = product.price;
    this.id = product.price;
    this.img = img
  }

  getHTMLString() {
    return `<div class="product-item" data-id="{this.id}">
           <img src="${this.img}" alt="img">
          <h3>${this.title}</h3>
          <p>${this.price}</p>
          <button class="by-btn">Добавить в корзину</button>
          </div>`;
  }
}

new ProductList();

/* Реализация без класса */
// const products = [
//   { id: 1, title: 'Notebook', price: 20000 },
//   { id: 2, title: 'Mouse', price: 1500 },
//   { id: 3, title: 'Keyboard', price: 5000 },
//   { id: 4, title: 'Gamepad', price: 4500 },
//   { id: 5, title: 'Notebook', price: 20000 },
//   { id: 6, title: 'Mouse', price: 1500 },
//   { id: 7, title: 'Keyboard', price: 5000 },
//   { id: 8, title: 'Gamepad', price: 4500 },
//   { id: 9, title: 'Notebook', price: 20000 },
//   { id: 10, title: 'Mouse', price: 1500 },
//   { id: 11, title: 'Mouse', price: 1500 },
//   { id: 12, title: 'Gamepad', price: 4500 },
//   { id: 13, title: 'Notebook', price: 20000 },
//   { id: 14, title: 'Mouse', price: 1500 },
//   { id: 15, title: 'Keyboard', price: 5000 },
//   { id: 16, title: 'Gamepad', price: 4500 },
// ];
//
// const renderProduct = (item, img = "img/200x150.png") => `<div class="product-item" data-id="{this.id}">
//                 <img src="${img}" alt="img">
//                 <h3>${item.title}</h3>
//                 <p>${item.price}</p>
//                 <button class="by-btn">Добавить в корзину</button>
//               </div>`;
//
// const renderProducts = list => {
//   document.querySelector('.products').insertAdjacentHTML('beforeend',
//     list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);
