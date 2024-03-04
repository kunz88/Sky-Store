import { Backdrop, Box, CircularProgress } from "@mui/material"

const LoadingComponent = () => {
    return (
        // componente che disabilita temporaneamente l'app al caricamento
        <Backdrop open={true} invisible={true}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress size={100} color="secondary"/>
            </Box>
        </Backdrop>
    )
}

export default LoadingComponent