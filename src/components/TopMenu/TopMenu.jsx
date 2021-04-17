import React from 'react'; 
import { Link } from 'react-router-dom'
import { Typography, AppBar, Toolbar, MenuItem, Container } from '@material-ui/core'

import toTitleCase from '../../models/toTitleCase'
import './style.css'

function TopMenu({ sectors }) {

    return (
        <Container>
            <AppBar className="top-menu" color="default" position="static">
                <Toolbar>
                    <MenuItem component={Link} to={'/'}>
                        <Typography variant="h6" component="h2">
                            Home
                        </Typography>
                    </MenuItem>

                    {
                        sectors.map(sector => {
                            return (
                                <MenuItem key={sector} component={Link} to={`/${sector}`}>
                                    <Typography variant="body1">
                                        {toTitleCase(sector)}
                                    </Typography> 
                                </MenuItem>
                            )
                        })
                    }
                </Toolbar>
            </AppBar>
        </Container>
    )
}

export default TopMenu