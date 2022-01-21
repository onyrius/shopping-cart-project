const getSavedCartItems = () => {
 const liStorage = localStorage.getItem('cartItems');
 return liStorage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
