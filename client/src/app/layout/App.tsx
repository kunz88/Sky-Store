
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";



const App = () => {


  // 1---useState utilizzo:
  // usiamo lo state per switchare il theme a dark
  const [darkMode,setdarkMode] = useState(false) // setto lo stato a false per iniziare il tema light
  const palette = darkMode ? 'dark' : 'light' // uso una variabile per storare il thema
  const theme = createTheme({ // creo un theme per il darkmode
    palette: {
      mode: palette, // setto la moda
      background:{ // setto il colore in background
        default:'#eaeaea'
      }
    }

  })
  const handleThemeChange = () =>{ // utilizzo un handler per gestire il cambio di stato
    setdarkMode(!darkMode);
  }
  return (

    //lo passo all'interno del theme provider
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* permette di togliere il padding iniziale della pagina */}
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* passo lo stato e l'handler come props' */}
      <Container>
        < Catalog />
      </Container>


    </ThemeProvider>


  )
}

export default App
