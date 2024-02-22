
// questo componente lo utilizzeremo per la nostra appBar
import { AppBar, Toolbar, Typography } from "@mui/material" // componenti di material che ci servono per l'appBar

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">{/* utilizzaiamo Typography per stilizzare il font del nostro h6 */ }
                    RE-STORE
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
export  default Header