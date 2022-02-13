class BasketItem{
    good_id;
    quantity;
    price;
    product_name;
    img;
    constructor(good_id,product_name,img,quantity, price) {
        this.good_id = good_id;
        this.product_name = product_name;
        this.img = img;
        this.quantity = quantity;
        this.price = price;
    }

    sum(){
        return this.price * this.quantity
    }
    getHTMLString() {
    return `<li class="basket-item" data-id="${this.good_id}">
           <img src="${this.img}" alt="img">
          <h3>${this.product_name}</h3>
          <p>${this.price}</p>
          </li>`;
  }
}

class Basket{
    #items;
    constructor(container='.basket') {
        this.container=container;
        this.#items = [];
    };
    sum(){
        /* сумма стоимости позиции */
        let result = 0;
        for (let inx=0; inx<this.#items.length;inx++){
            result += this.#items[inx].sum()
        }
        return result;
    };
    change(good_id,product_name,img='img/200x150.png',quantity, price){
        /* изменить кол-во */
        for (let inx=0; inx<this.#items.length;inx++){
                console.log(this.#items[inx].good_id)
                let item = this.#items.find(item => item.good_id == good_id);
                if (item == -1) {return;}
                item.quantity+=quantity;
                return
            }
        if (quantity > 0) {
            let new_item=new BasketItem(good_id,product_name,img,quantity,price);
            this.#items.push(new_item);
        }
        return;
    };
    #render(){
            const container = document.querySelector(this.container);
            for (let item  of this.#items){
              container.insertAdjacentHTML('beforeend',
                  item.getHTMLString())
        }
    }
}

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
              container.insertAdjacentHTML('beforeend', productObject.getHTMLString())
        }
      }
}

class ProductItem{
  constructor(product, img='img/200x150.png') {
    this.title  = product.title;
    this.price  = product.price;
    this.id = product.id;
    this.img = img
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}" data-price="${this.price}">
            <img src="${this.img}" alt="img">
           <h3>${this.title}</h3>
            <p>${this.price}</p>
            <button class="by-btn">Добавить в корзину</button>
            </div>`;
  }
}

new ProductList();
let basket = new Basket();

//Обработчик на добавление в корзину.
const buttons = document.querySelectorAll('.by-btn')
buttons.forEach((button) => {
    button.addEventListener('click',
        event => {
            console.log('Добавлен товар:', button.parentElement);
            let product_id = button.parentElement.
                                    getAttribute("data-id");
            let product_name = button.parentElement.
                                    querySelector("h3").outerText;
            let product_price = +button.parentElement.
                                    querySelector("p").outerText;
            console.log(product_id,product_name,product_price);
            basket.change(product_id,product_name,'img/200x150.png',1,product_price);
        })});

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
