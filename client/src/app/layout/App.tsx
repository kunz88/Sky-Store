
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";



const App = () => {


  // 1---useState utilizzo:
  // usiamo lo state per switchare il theme a dark
  const [darkMode,setdarkMode] = useState(false) // setto lo stato a false per iniziare il tema light
  const paletteType = darkMode ? 'dark' : 'light' // uso una variabile per storare il thema
  const theme = createTheme({ // creo un theme per il darkmode
    palette: {
      mode: paletteType, // uso lo state per modificare la palette di colori ('dark' : 'light')
      background:{ // setto il colore in background
        default:paletteType === 'light'?'#eaeaea': '#121212' // lego il background alla palette utilizzata
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
        < Outlet /> {/* // Renders the child route's element, if there is one */}
      </Container>


    </ThemeProvider>


  )
}

export default App
