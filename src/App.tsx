import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages"

function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/users">Users</Link>
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
				<Routes>
					{/* <Route path="/pages">
						<About />
					</Route>
					<Route path="/users">
						<Users />
					</Route> */}
					<Route path="/" element={<Home />}  />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
