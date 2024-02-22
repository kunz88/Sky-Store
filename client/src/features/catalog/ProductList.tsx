import { List } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"


type Props = {// abbiamo bisongo di un tipo che rappresenti lo schema delle nostre props
    products: Product[],

}
const ProductList = ({ products }: Props) => { // Products list accetta come paramentro props un array di prodotti
    return (
        <List>
            {products.map((product) => ( /* renderizziamo la lista di tutti i prodotti dinamicamente */
                <ProductCard key={product.id} product={product} />
            ))}
        </List>
    )

}
export default ProductList