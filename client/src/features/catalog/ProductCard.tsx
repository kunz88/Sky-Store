// reiamo un altro componente per la card del singolo prodotto

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Product } from "../../app/models/product"
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useState } from "react";
import agent from "../../app/api/agent";
type Props = {// abbiamo bisongo di un tipo che rappresenti lo schema delle nostre props
    product: Product,

}
const ProductCard = ({ product }: Props) => { // Products list accetta come paramentro props un prodotto
    // usiamo local state dentro il componente
    const [loading, setLoading] = useState(false);

    // handler per l'aggiunta di un prodotto nel carrello
    const handleAddItem = (productId: number) => {
        setLoading(true);
        agent.Basket.addItem(productId)
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }
    return (

        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{
                        bgcolor: "secondary.main"
                    }}>
                        {product.name.charAt(0).toUpperCase()} {/* prendiamo il primo carattere del nome e lo utilizzaimo all'interno dell'avatar */}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{ /* questa props prende in ingresso un oggetto che ha come chiave sx
                                    sx ci permette di accedere al thema del componente per modificaro attraverso regole css */
                    sx: {
                        fontWeight: "bold",
                        color: "primary.main"
                    }
                }}

            />


            <CardMedia
                sx={{ height: 140, backgroundSize: "contain", bgcolor: "primary.light" }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color="secondary">
                    {(product.price / 100).toFixed(2)} $
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                loading={loading} 
                onClick={() => handleAddItem(product.id)} 
                size="small">Add to cart</LoadingButton>
                {/* aggiungiamo al bottone "view" il link alla route catalog/:id */}
                <Button component={Link} to={`/catalog/${product.id}`} size="small">view</Button> {/* aggiungo il componente di react-router-dom link */}
            </CardActions>
        </Card>

    );

}

export default ProductCard