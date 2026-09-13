import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Landing />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default App;