import React, { useContext } from 'react'
import { Grid, Typography, Card, CardContent, CardActionArea } from '@material-ui/core'

import Sectors from '../../context/Sectors'
import toTitleCase from '../../models/toTitleCase'
import useSectors from '../../hooks/useSectors'

function Home() {

    const sectorsContext = useContext(Sectors)

    const [ sectors, setSectors ] = useSectors(sectorsContext)

    return (
        <>
            <Typography variant="h3" gutterBottom>
				Monitor de Humidade 
			</Typography>
            
            <Grid container spacing={3}>
                {
                    sectors.map(sector => {
                        
                        return(
                            <Grid item xs={6} key={ sector }>
                                <Card>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="h4" gutterBottom>{ toTitleCase(sector) }</Typography>
                                            <Typography variant="h6">Humidade atual: xx %</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export default Home