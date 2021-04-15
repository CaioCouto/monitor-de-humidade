import React, { useContext } from 'react'; 
import { Button, Typography, AppBar, Toolbar} from '@material-ui/core'

import Sectors from '../../context/Sectors'
import './style.css'

function TopMenu({ page }) {

    const context = useContext(Sectors)

    function handleButtonClick(e, sector) {
        page(sector)
    }

    return (
        <AppBar className="top-menu" color="default" position="static">
            <Toolbar>
                <Button onClick={e => handleButtonClick(e) }>
                    <Typography variant="h6" component="h2">
                        Home
                    </Typography>
                </Button>

                {
                    context.sectors.map(sector => {
                        return (
                            <Button 
                                key={sector}
                                onClick={e => handleButtonClick(e, sector) }
                            >
                                {sector}
                            </Button> 
                        )
                    })
                }
            </Toolbar>
        </AppBar>
    )
}

export default TopMenu