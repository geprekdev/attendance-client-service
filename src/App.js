import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClassList from "./pages/ClassList";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/instructor/classlists" element={<ClassList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
