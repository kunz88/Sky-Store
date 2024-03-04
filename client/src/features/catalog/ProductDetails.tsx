import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
// adesso utilizzeremo questo componente per renderizzare la pagina dettaglio di ogni prodotto

const ProductDetails = () => {
    // avremo bisogno del hook di react-route useParams() per identificare l'id passato nel url
    const { id } = useParams<{ id: string }>();
    // usiamo uno stato per conservare il nostro paramentro product
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true)

    // avremo bisogno di una chiamata la nostro server utilizzando axios e useEffect
    useEffect(() => {
        id && agent.Catalog.details(parseInt(id)) // essendo l'id possibilmente null potremmo avere un errore
            .then((response) => setProduct(response)) // settiamo il prodotto prendendola dalla risposta del server
            .catch(error => console.log(error))
            .finally(() => setLoading(false)) // setto il loading a false, la nostra chiamata remota è finita

    }, [id]);// ogni volta che uso useEffect vanno aggiunte le sue dipendenze
    // in questo caso useEffect viene chiamato quando il componente viene montato o quando
    // l'id ( parametro di dipendenza) cambio

    if (loading) return <LoadingComponent/>
    if (!product) { return <h3>Product not found</h3> }
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">
                    {product.name}
                </Typography>
                <Divider />
                <Typography variant="h4" color="secondary">
                    {(product.price / 100).toFixed(2)} $
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>

        </Grid>
    )
}
export default ProductDetails