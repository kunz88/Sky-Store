
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"
import { useState, useEffect } from "react";


const Catalog = () => {// adesso creiamo un componente per il catalogo

    const [products, setProducts] = useState<Product[]>([]);
    const [loading,setLoading] = useState(true)

    {/* // 2---useEffect viene utilizzato tutte le volte che dobbiamo fare una chiamata esterna alla nostra app client (es.fetch api) */ }

    useEffect(() => {
        agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, []);// è molto importante passare un secondo parametro [] (empty dep), la nostra dependencies, altrimenti la callback verrà chiamata innumerevoli volte, andando in loop

    if(loading) return <LoadingComponent/>
    return (
        <> {/* avremo bisogno di un elemento genitore per inserire i due elementi figli li e button 
        potremmo utilizzare un div, ma se non ne abbiamo bisogno per la struttura della pagina 
        meglio utilizzare fragment oppure <> empty tag*/}



            <ProductList products={products} /> {/* al componente passo la props product */}


        </>
    )

}
export default Catalog


