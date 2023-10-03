import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import { Routes, Route } from "react-router-dom";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
  );
}

export default App;
