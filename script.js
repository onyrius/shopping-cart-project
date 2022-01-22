const listaDeItensCart = document.querySelector('.cart__items'); // ol do carrinho
console.log(listaDeItensCart);
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  const price = salePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  section.className = 'item';
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;  
}
/** Source: adaptar para moeda brasileira 
 * https://www.horadecodar.com.br/2020/09/01/formatar-moeda-brasileira-em-javascript-float-para-real/
 */

// pega os ids dos itens para serem colocados no carrinho
 function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} 
/** Source: sobre parent element
 * https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_node_parentelement
 */
 
function cartItemClickListener(event) {
  event.target.remove();
  
  saveCartItems(listaDeItensCart.innerHTML); // atualiza o localStorage
 }
 
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
   const li = document.createElement('li');
   li.className = 'cart__item';
   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
   li.addEventListener('click', cartItemClickListener);
   return li;
  }
  
  const loadLocalStorage = () => {
    const loadStorage = getSavedCartItems();
     // somente depois que cada linha è criada, chamamos novamente e colocamos o escutador
     listaDeItensCart.innerHTML = loadStorage;
     return listaDeItensCart;
  };
  const addBtnNewLi = () => {
    const allLiCart = document.querySelectorAll('.cart__item');
    allLiCart.forEach((liCart) => {
    liCart.addEventListener('click', cartItemClickListener);
    }); 
  };

  const addCartProductItemID = async ({ target }) => {
    const getId = getSkuFromProductItem(target.parentElement); 
  const itemProduct = await fetchItem(getId);
  const { id, title, price } = itemProduct;
  const itemCartOn = createCartItemElement({ id, price, title });
  listaDeItensCart.appendChild(itemCartOn);
   saveCartItems(listaDeItensCart.innerHTML); // atualiza o localStorage
 };

const addClickOnItemProductBtn = () => {
  const allProductsButtons = document.querySelectorAll('.item__add');
  allProductsButtons.forEach((button) => {
    button.addEventListener('click', addCartProductItemID);
  });
};

// trazendo as funçoes assincronas
async function loadProducts() {
  const dataProducts = await fetchProducts('computador');
   const objectProduct = {};
   dataProducts.forEach((products) => {
     objectProduct.name = products[1].title;
     objectProduct.salePrice = products[1].price;
     objectProduct.sku = products[1].id;
     objectProduct.image = products[1].thumbnail.replace('I.jpg', 'W.webp');
     const sectionItem = document.querySelector('.items');
   sectionItem.appendChild(createProductItemElement(objectProduct));
 });
}

const removeAll = () => {
 listaDeItensCart.innerHTML = '';
 saveCartItems(listaDeItensCart.innerHTML);
 const cartNew = document.querySelector('.cart_items');
 return cartNew;
};

const buttonEraseAll = document.querySelector('.empty-cart');
buttonEraseAll.addEventListener('click', removeAll);

const putLoadind = () => {
  const loading = document.createElement('p');
  loading.innerText = 'carregando...';
  loading.className = 'loading';
  listaDeItensCart.appendChild(loading);
  return loading;
}; 

window.onload = async () => { 
 putLoadind();
await loadProducts();
putLoadind().remove();
addClickOnItemProductBtn();
loadLocalStorage();
addBtnNewLi();
};
/** Source: 
 * projeto densenvolvido com o auxilio do repositorio do Thiago Nobrega:
 * https://github.com/tryber/sd-018-b-project-shopping-cart/pull/30/files
 */