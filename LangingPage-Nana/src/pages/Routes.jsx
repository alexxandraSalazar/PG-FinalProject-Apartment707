import { Routes, Route } from "react-router-dom";
import LandingPage from "../../LangingPage-Nana/src/pages/FirstPage";
import GLBViewer from "../../LangingPage-Nana/src/components/FBXViewer"; // o GLBViewer si lo renombraste
///import LandingPageApp from "../LandingPage/App"; // Importación de la LandingPage
import FirstPage from "../pages/FirstPage"; // Importación de FirstPage

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/play" element={<GLBViewer />} />
      <Route path="/first" element={<FirstPage />} />
    </Routes>
  );
}
