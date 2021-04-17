import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts'

import toTitleCase from '../../models/toTitleCase'
import { getData } from '../../api/api'

function LinePlot({ sector }) {

    const [ plotData, setPlotData] = useState({})
    const [ lastHumidity, setLastHumidity ] = useState(0)

    useEffect(() => {
        getData(`read-data/${sector}`, setPlotData, setLastHumidity)
    }, [sector])

    return (
        <>
            <Typography variant="h3">
				Setor: { toTitleCase(sector) }
			</Typography>

            <Typography variant="h6" gutterBottom>
				Última humidade registrada: { lastHumidity }
			</Typography>

            <Container disableGutters>
                <LineChart
                    width={1280}
                    height={400}
                    data={plotData}
                    margin={{top: 10, bottom: 10, left: 30, right: 30}}
                >
                    <XAxis 
                        dataKey='date'
                        interval="preserveStartEnd"
                        angle={15}
                        height={60}
                    />

                    <YAxis/>
                    <Tooltip/>
                    <CartesianGrid stroke='#f5f5f5'/>

                    <Line
                    type="monotone"
                    key="0"
                    dataKey="humidity"
                    stroke="#000000"
                    strokeWidth={5}
                    yAxisId={0}
                    />
                </LineChart>
            </Container>
        </>
    )
}



export default LinePlot