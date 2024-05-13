import './App.css';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
