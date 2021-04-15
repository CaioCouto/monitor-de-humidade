import React, { useContext, useState } from 'react'; 
import { Container } from '@material-ui/core'

import useSectors from './hooks/useSectors'
import Sectors from './context/Sectors'
import LinePlot from './components/LinePlot/LinePlot'
import TopMenu from './components/TopMenu'
import Home from './components/Home'

import './App.css'

function App() {

	const context = useContext(Sectors)

	const [ sectors, setSectors ] = useSectors(context)
	const [ sectorIndex, setSectorIndex ] = useState(-1)

	function page(sector) {
		const index = sectors.indexOf(sector)
		setSectorIndex(index)
	}
	
	return (
		<Container className="App" maxWidth="lg">
			<TopMenu page={page}/>

			{ 
				sectorIndex === -1 ?
				<Home/> :
				<LinePlot sector={sectors[sectorIndex]}/>
			}
		</Container>
	);
}

export default App;
