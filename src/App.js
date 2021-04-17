import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'

import { getSectors } from './api/api'
import LinePlot from './components/LinePlot'
import TopMenu from './components/TopMenu'
import Home from './components/Home'

import './App.css'

function App() {

	const [ sectors, setSectors ] = useState([])

	useEffect(() => {
        getSectors('read-data/sectors',setSectors)
    }, [])
	
	return (
		<BrowserRouter>
			<Container className="App" maxWidth={false} disableGutters>
				<TopMenu sectors={sectors}/>

				<Switch>
					<Route path="/" exact>
						<Home/>
					</Route>

					{
						sectors.map(sector => (
							<Route path={`/${sector}`} key={sector}>
								<LinePlot sector={sector}/>
							</Route>
						))
					}

					<Route>
						<h1>Não Existe</h1>
					</Route>
				</Switch>
			</Container>
		</BrowserRouter>
	);
}

export default App;
