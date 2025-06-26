import { BrowserRouter, Routes, Route } from "react-router-dom";
import FBXViewer from "./components/FBXViewer";
import FirstPage from "./pages/FirstPage";

// Componentes de la landing page
import './App.css'; // Asegúrate de tener estilos globales si es necesario
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About'; // Ajuste a la ruta correcta
import Rooms from './components/Rooms';
import CallAction from './components/CallAction';
import Footer from './components/Footer';
import People from './components/People';

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <People />
      <Rooms />
      <CallAction />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Landing principal */}
          <Route path="/" element={<LandingPage />} />

          {/* Página con el apartamento 3D */}
          <Route path="/play" element={<FBXViewer />} />

          {/* Otra página desde FirstPage.jsx si aún la usas */}
          <Route path="/first" element={<FirstPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
