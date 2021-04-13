import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Grid, Typography } from '@material-ui/core'
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts'

function LinePlot() {
    const [ readings, setReadings ] = useState([])
    const [ plotData, setPlotData] = useState([])
    const [ lastReading, setLastReading ] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}`).then(res => {
            setReadings(res.data.readings)
        })
    }, [])

    useEffect(() => {
        const graphData = []
        readings.map(reading => graphData.push({'date':reading[0], 'humidity':reading[1]}))
        setPlotData(graphData)
    }, [readings])

    return (
        <Grid
            xs={8}
            item
        >
            <LineChart
                width={1280}
                height={500}
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
        </Grid>
    )
}



export default LinePlot