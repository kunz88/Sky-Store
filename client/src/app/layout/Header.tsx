import { ShoppingCart } from '@mui/icons-material'
import { Badge, Box, IconButton, List, ListItem, Switch } from '@mui/material'
// questo componente lo utilizzeremo per la nostra appBar
import { AppBar, Toolbar, Typography } from "@mui/material" // componenti di material che ci servono per l'appBar
import { NavLink } from 'react-router-dom'

// array per i links da utilizare come routes
const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" }
]

const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },

]

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": {
        color: "grey.500"
    },
    "&.active": {
        color: "text.secondary"
    }
}
type Props = {// abbiamo bisongo di un tipo che rappresenti lo schema delle nostre props
    darkMode: boolean,
    handleThemeChange: () => void


}/* parametri da passare all'header */
const Header = ({ darkMode, handleThemeChange }: Props) => {
    return (
        <AppBar position="static" sx={{ mb: 4 }}> {/* sx permette di sovrascrivere il css originario aggiungendo proprietà ( es. margin bottom 4 (equivalente a 32 px)) */}

            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" component={NavLink} // utilizziamo l'elemento navlink della libreria react-router-dom 
                        to={"/"} // chiave dove interire il path di destinazione del link
                        sx={navStyles}>
                        RE-STORE
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} /> {/* uso i parametri nel bottone switch */}
                </Box>


                <List sx={{ display: "flex" }}>
                    {midLinks.map(({ title, path }) => {
                        return <ListItem
                            component={NavLink} // utilizziamo l'elemento navlink della libreria react-router-dom 
                            to={path} // chiave dove interire il path di destinazione del link
                            key={path} // abbiamo bisogno anche di una chiave che rappresenti l ' anchor link, utiliziamo path perchè è una chiave univoca
                            sx={navStyles} // style inline di listitem

                        > {title.toUpperCase()}</ListItem>

                    })}
                </List>



                <Box display="flex" alignItems="center">

                    <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <Badge badgeContent="4" color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: "flex" }}>
                        {rightLinks.map(({ title, path }) => {
                            return <ListItem
                                component={NavLink} // utilizziamo l'elemento navlink della libreria react-router-dom 
                                to={path} // chiave dove interire il path di destinazione del link
                                key={path} // abbiamo bisogno anche di una chiave che rappresenti l ' anchor link, utiliziamo path perchè è una chiave univoca
                                sx={navStyles} // style inline di listitem

                            > {title.toUpperCase()}</ListItem>

                        })}
                    </List>
                </Box>

            </Toolbar>

        </AppBar>
    )
}
export default Header