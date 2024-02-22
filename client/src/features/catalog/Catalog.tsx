import { Button } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"


type Props = {// abbiamo bisongo di un tipo che rappresenti lo schema delle nostre props
    products: Product[],
    addProduct: () => void



}

const Catalog = ({ products, addProduct }: Props) => {// adesso creiamo un componente per il catalogo
    // avremo bisongo di una props per portare le variabili del componente genitore
    // dovremo specificare al momento il tipo dell'oggetto props
    // se vogliamo possiamo detrutturare le propietà dentro l'oggetto props così da non dover utilizzarlo con la notazione puntata
    return (
        <> {/* avremo bisogno di un elemento genitore per inserire i due elementi figli li e button 
        potremmo utilizzare un div, ma se non ne abbiamo bisogno per la struttura della pagina 
        meglio utilizzare fragment oppure <> empty tag*
    adesso utilizziamo i componenti di materialUI per stilizzare la nostra liasta ed il nostro bottone*/}

            <ProductList products={products} /> {/* al componente passo la props product */}


            <Button variant="contained" onClick={addProduct}> Add product </Button>
        </>
    )

}
export default Catalog