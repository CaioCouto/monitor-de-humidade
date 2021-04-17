import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Typography, Card, CardContent, CardActionArea, MenuItem } from '@material-ui/core'

import toTitleCase from '../../models/toTitleCase'
import { getLastData } from '../../api/api' 

function Home() {

    const [ data, setData ] = useState({})

    useEffect(() => {
        getLastData('/read-last-data', setData)
    }, [])

    return (
        <>
            <Typography variant="h3" gutterBottom>
				Monitor de Humidade
			</Typography>
            
            {
                Object.entries(data).length >= 1 ?
                <Container>
                    <Grid container spacing={3}>
                    {
                        Object.entries(data).map(([sector, humidity]) => {
                            return(
                                <Grid item xs={6} key={ sector }>
                                    <Card>
                                        <CardActionArea>
                                            <MenuItem component={Link} to={`/${sector}`}>
                                                <CardContent>
                                                    <Typography variant="h4" gutterBottom>{ toTitleCase(sector) }</Typography>
                                                    <Typography variant="h6">Humidade atual: {humidity} %</Typography>
                                                </CardContent>
                                            </MenuItem>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                    </Grid>
                </Container> :
                <Typography variant="h4">
				    Não há registros.
			    </Typography>
            }
        </>
    )
}

export default Home