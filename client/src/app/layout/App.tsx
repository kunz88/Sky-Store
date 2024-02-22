import { useEffect, useState } from "react"
import { Product } from "../models/product"
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";



const App = () => {
  // 1---useState utilizzo:
  const [products, setProducts] = useState<Product[]>([]);

  // 2---useEffect viene utilizzato tutte le volte che dobbiamo fare una chiamata esterna alla nostra app client (es.fetch api)

  useEffect(() => {
    fetch('http://localhost:5000/API/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);// è molto importante passare un secondo parametro [] (empty dep), la nostra dependencies, altrimenti la callback verrà chiamata innumerevoli volte, andando in loop


  const addProduct = () => { // prevState si riferisce allo stato precedente della variabile products
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

  }

  return (

    //passiamo products e addProduct al componente figlio com props
    <>
      <CssBaseline /> {/* permette di togliere il padding iniziale della pagina */}
      <Header />
      <Container>
        < Catalog products={products} addProduct={addProduct} />
      </Container>


    </>


  )
}

export default App
