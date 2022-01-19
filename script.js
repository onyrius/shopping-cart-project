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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;  
}
/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

/* function cartItemClickListener() {
  // coloque seu código aqui
}
function createCartItemElement({ sku, name, salePrice }) {
    const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
} */

// trazendo as funçoes assincronas
async function awaitingAsynFunctions() {
  const dataProducts = await fetchProducts('computador'); 
  console.log();
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

window.onload = () => { 
  awaitingAsynFunctions();
};
