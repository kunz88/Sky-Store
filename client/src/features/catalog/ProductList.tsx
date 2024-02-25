import { Grid} from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"


type Props = {// abbiamo bisongo di un tipo che rappresenti lo schema delle nostre props
    products: Product[],

}
const ProductList = ({ products }: Props) => { // Products list accetta come paramentro props un array di prodotti
    // avremo bisongo di una props per portare le variabili del componente genitore
    // dovremo specificare al momento il tipo dell'oggetto props
    // se vogliamo possiamo detrutturare le propietà dentro l'oggetto props così da non dover utilizzarlo con la notazione puntata
    return (
        <Grid container spacing={4}>    {/*  abbiamo una griglia */}
            {products.map((product) => ( /* renderizziamo la lista di tutti i prodotti dinamicamente */
            <Grid item xs={3} key={product.id}>  {/* ogni card prenderà tre colonne */}
                <ProductCard  product={product} />
            </Grid>
            ))}
        </Grid>
    )

}
export default ProductList