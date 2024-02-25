
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"
import { useState, useEffect } from "react";


const Catalog = () => {// adesso creiamo un componente per il catalogo

    const [products, setProducts] = useState<Product[]>([]);

    {/* // 2---useEffect viene utilizzato tutte le volte che dobbiamo fare una chiamata esterna alla nostra app client (es.fetch api) */ }

    useEffect(() => {
        fetch('http://localhost:5000/API/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, []);// è molto importante passare un secondo parametro [] (empty dep), la nostra dependencies, altrimenti la callback verrà chiamata innumerevoli volte, andando in loop
    return (
        <> {/* avremo bisogno di un elemento genitore per inserire i due elementi figli li e button 
        potremmo utilizzare un div, ma se non ne abbiamo bisogno per la struttura della pagina 
        meglio utilizzare fragment oppure <> empty tag*
    adesso utilizziamo i componenti di materialUI per stilizzare la nostra liasta ed il nostro bottone*/}



            {/* const addProduct = () => { // prevState si riferisce allo stato precedente della variabile products
                setProducts(prevState => [...prevState,
                {
                    id: prevState.length + 101,
                    name: 'product' + (prevState.length + 1),
                    price: (prevState.length * 100),
                    description: "some description",
                    pictureUrl: 'http://picsum.photos/200',
                    brand: "some brand"

                }]) // usiamo il setState per aggiungere un prodotto , useremo poi la funzione per
                // aggiungere prodotti dinamicamente tramite un bottone "add product"che utilizza onClick 

            } */}

            <ProductList products={products} /> {/* al componente passo la props product */}


            {/*             <Button variant="contained" onClick={addProduct}> Add product </Button> */}
        </>
    )

}
export default Catalog


