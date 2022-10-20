import './App.css';
import NavBar from './components/NavBar.jsx';
import Router from './routes/Router.jsx';

function App() {
	return (
		<div className="App">
			<NavBar />

			<div className="container py-2">
				<Router />
			</div>
		</div>
	);
}

export default App;
