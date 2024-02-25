import { Switch } from '@mui/material'
// questo componente lo utilizzeremo per la nostra appBar
import { AppBar, Toolbar, Typography } from "@mui/material" // componenti di material che ci servono per l'appBar

type Props = {// abbiamo bisongo di un tipo che rappresenti lo schema delle nostre props
    darkMode: boolean,
    handleThemeChange: () => void


}/* parametri da passare all'header */
const Header = ({darkMode,handleThemeChange}:Props) => { 
    return (
        <AppBar position="static" sx={{mb:4}}> {/* sx permette di sovrascrivere il css originario aggiungendo proprietà ( es. margin bottom 4 (equivalente a 32 px)) */}
            
            <Toolbar>
                <Typography variant="h6">{/* utilizzaiamo Typography per stilizzare il font del nostro h6 */ }
                    RE-STORE
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} /> {/* uso i parametri nel bottone switch */}
            </Toolbar>
            
        </AppBar>
    )
}
export  default Header