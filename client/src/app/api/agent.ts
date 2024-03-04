import axios, { AxiosResponse } from "axios";


// TUILIZIAMO UN AGENT PER CENTRALIZZARE TUTTE LE NOSTRE CHIAMATE ALLE API
// EVITANDO RIDONDANZA DEL CODICE

// opzione per l'url base per tutte le chiamate di axios
axios.defaults.baseURL = 'http://localhost:5000/api/';

// opzione per ricezione di cookies
axios.defaults.withCredentials = true;

// funzione per simulare un ritardo nel loading delle pagine
const sleep = () => new Promise(resolve => setTimeout(resolve , 500));


axios.interceptors.response.use(async response => {
    await sleep();
    return response
})

// callback per fetchare il body all'interno di una resposta
const responseBody = (response: AxiosResponse) => response.data;

// oggetto che contiene tutti i metodi per effettuare una richiesta
const request = {
    
    
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string,body: object) => axios.post(url,body).then(responseBody),
    put: (url:string,body: object) => axios.put(url,body).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody)

}

// oggetto che contiene Read per il catalogo
const Catalog = {
    list: () => request.get('products'),
    details: (id:number) => request.get(`products/${id}`)
}
 
// oggetto che contiene la crd per il carrello
const Basket = {
    get: () => request.get('basket'),
    addItem: (productId:number,quantity = 1) => request.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem: (productId:number,quantity = 1) => request.delete(`basket?productId=${productId}&quantity=${quantity}`)
}
// oggetto che contiene Catalog
const agent = {
    Catalog,
    Basket
}


export default agent