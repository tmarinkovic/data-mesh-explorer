import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";

const Header = () => {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" className="app-bar">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
                        Data Mesh Explorer
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header