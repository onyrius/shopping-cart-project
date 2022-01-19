require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função', () => {
      expect(typeof fetchItem).toEqual('function')
  })
  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada.', async () => {
    const fetchItemTested = await fetchItem('MLB1615760527');
     expect(fetch).toHaveBeenCalledTimes(1)
  })
    fail('Teste vazio');
});
