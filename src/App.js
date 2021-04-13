import React from 'react'; 
import { Grid } from '@material-ui/core'
import LinePlot from './components/LinePlot'

import './App.css';

function App() {
	
	return (
		<Grid 
			className="App"
			direction="column"
			justify="center"
			alignItems="center"
			container
		>
			<LinePlot/>
		</Grid>
	);
}

export default App;
