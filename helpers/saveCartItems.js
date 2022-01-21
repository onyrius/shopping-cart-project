const saveCartItems = (item) => {
   const saveItemLocalStorage = localStorage.setItem('cartItems', item);
   return saveItemLocalStorage;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
