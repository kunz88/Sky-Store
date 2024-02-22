// reiamo un altro componente per la card del singolo prodotto

import { ListItem, Avatar, ListItemText, ListItemAvatar } from "@mui/material"
import { Product } from "../../app/models/product"
type Props = {// abbiamo bisongo di un tipo che rappresenti lo schema delle nostre props
    product: Product,

}
const ProductCard = ({ product }: Props) => { // Products list accetta come paramentro props un prodotto
    return (
        <ListItem key={product.id}>
            <ListItemAvatar>
                <Avatar src={product.pictureUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText> {product.name} - {product.price} </ListItemText>
        </ListItem>
    )

}

export default ProductCard