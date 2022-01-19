require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts',  () => {
  it('Teste se fetchProducts é uma função', async () =>{
    const fetchProductsTested = await fetchProducts;
    expect(typeof fetchProductsTested).toEqual('function')
  })

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    const fetchProductsTested = await fetchProducts('computador');
  //  console.log(fetchProductsTested);
    expect(fetchProductsTested[0][1].id).toBe('MLB1615760527');
  })
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', async () => {
    await fetchProducts('computador')
    const url =  "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const fetchProductsTested = await fetchProducts('computador');
     const computadorResults = Object.entries(computadorSearch.results)
    expect(fetchProductsTested).toEqual(computadorResults);
  })
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. ', async () => {
    const fetchProductsTested = await fetchProducts();
    expect(fetchProductsTested).toEqual(new Error('You must provide an url'));
  })
});
