const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/"
//https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json
//Получение запроса
const getRequest = (url) => {
    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET',url, true);
        xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200){
                reject('Error');
            }
            else {
                resolve(xhr.responseText);
            }
        }
    };
    xhr.send();
})};



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
    return `<tr class="basket-elem" data-id="${this.good_id}">
                <td><img src="${this.img}" alt="img"></td>
                <td class="basket-name">${this.product_name}</td>
                <td class="basket-price">${this.price}</td>
                <td class="basket-quantity">${this.quantity}
                    <button class="by-btn basket-increase">+</button>
                    <button class="by-btn basket-decrease">-</button>
                </td>
                <td>${this.sum()}</td>
            </tr>`;
  }
}

class Basket{
    #items;
    #btnBasket;
    #windowBasket;
    #btnBasketClose;
    #btnIncrease;
    #btnDecrease;
    constructor(container='.windows-basket') {
        this.container=container;
        this.#items = [];
        // Элемент кнопки вызов корзины
        this.#btnBasket = document.querySelector(`.menu > .basket`);
        // Элемент кнопки Закрытия корзины
        this.#btnBasketClose = document.querySelector(`.iw-close`);
        // Элемент окна корзины
        this.#windowBasket = document.querySelector(`.iw-modal`);

        this.#listener();
    };
    #listener(){
        this.#btnBasket.addEventListener('click',() => {
            this.#click_basket();
        });
        this.#btnBasketClose.addEventListener('click',() => {
            this.#click_basket();
        });
    };
    #click_basket() {
        if (this.#windowBasket.style.opacity === "0" || this.#windowBasket.style.opacity  === '') {
             this.#windowBasket.style.opacity = "1";
             this.#windowBasket.style['pointer-events'] = "auto";
             this.#windowBasket.style['overflow-y'] = "auto";
            // this.#windowBasket.style["z-index"] = "0";
        } else {
            this.#windowBasket.style.opacity = "0";
            this.#windowBasket.style['pointer-events'] = "none";
            this.#windowBasket.style['overflow-y'] = "none";
        };
    };
    sum(){
        /* сумма стоимости позиции */
       return this.#items.map(item => item.sum())
            .reduce((prev, curr) => prev + curr, 0);
    };
    change(good_id,product_name,img='img/200x150.png',quantity, price){
        /* изменить кол-во как в большую, так и в меньшую сторону*/
        let item = this.#items.find(item => item.good_id === good_id);
        if (!item) {
            // Если новый продукт добавляется
            if (quantity > 0) {
                let new_item=new BasketItem(good_id,product_name,img,quantity,price);
                this.#items.push(new_item);
            }
        } else if ((item.quantity+quantity)>0) {
            // Если после изменения кол-во положительное
            item.quantity+=quantity;
        } else {
            //Если после изменение кол-во равно нулю
            let inx = this.#items.indexOf(item);
            this.#items.splice(inx,1);
        }
        console.log(this.#items);
        this.#render();
    };
    getHTMLStringTotal() {
    return `<tr class="basket-total">
                <td>Итого:</td><td></td><td></td><td></td>
                <td>${this.sum()}</td>
            </tr>`;
  }
    #render(){
            const container = document.querySelector(this.container);
            container.innerHTML=`
                             <tr>
                                <th></th>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                            </tr>
            `;
            for (let item  of this.#items){
              container.insertAdjacentHTML('beforeend',item.getHTMLString());
        }
            container.insertAdjacentHTML('beforeend',this.getHTMLStringTotal());

        // Элемент "+"
        this.#btnIncrease = document.querySelectorAll('.basket-increase');
        this.#btnIncrease.forEach(elem => elem.addEventListener('click',()=>{
            let product_id = elem.parentElement.parentElement
                                        .getAttribute("data-id");
            let product_name = elem.parentElement.parentElement
                                        .querySelector(".basket-name")
                                        .outerText;
            let product_price = +elem.parentElement.parentElement
                                        .querySelector(".basket-price")
                                        .outerText;
            basket.change(product_id,product_name,'img/200x150.png'
                                        ,1,product_price);
        }));

        // Элемент "-"
        this.#btnDecrease = document.querySelectorAll(`.basket-decrease`);
        this.#btnDecrease.forEach(elem => elem.addEventListener('click',()=>{
            let product_id = elem.parentElement.parentElement
                                        .getAttribute("data-id");
            let product_name = elem.parentElement.parentElement
                                        .querySelector(".basket-name")
                                        .outerText;
            let product_price = +elem.parentElement.parentElement
                                        .querySelector(".basket-price")
                                        .outerText;
            basket.change(product_id,product_name,'img/200x150.png'
                                        ,-1,product_price);
        }));
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
        // this.#fetchGoods();
        this.#getProducts()
            .then((data) => {
                this.#goods =[...data];
                this.#goods.forEach( function(data) {
                    data['title'] = data['product_name'];
                    delete data['product_name'];
                    data['id'] = data['id_product'];
                    delete data['id_product'];
                })
                this.#render();
                this.#listener();
            })
    }

    #getProducts() {
        return getRequest(`${API}catalogData.json`)
            .then(
                response => [...JSON.parse(response)]
                , error => console.log(error)
            );
    };

    #render(){
            const container = document.querySelector(this.container);
            for (let product  of this.#goods){
              const productObject = new ProductItem(product);
              container.insertAdjacentHTML('beforeend', productObject.getHTMLString())
        }
      }
    #listener(){
        //Обработчик на добавление в корзину.
        const buttons = document.querySelectorAll('.by-btn')
        buttons.forEach((button) => {
            button.addEventListener('click',
                () => {
                    console.log('Добавлен товар:', button.parentElement);
                    let product_id = button.parentElement.
                                            getAttribute("data-id");
                    let product_name = button.parentElement.
                                            querySelector("h3").outerText;
                    let product_price = +button.parentElement.
                                            querySelector("p").outerText;
                    // console.log(product_id,product_name,product_price);
                    basket.change(product_id,product_name,'img/200x150.png',1,product_price);
                })});
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
            <button class="by-btn increase">Добавить</button>
            </div>`;
  }
}

new ProductList();
let basket = new Basket();
