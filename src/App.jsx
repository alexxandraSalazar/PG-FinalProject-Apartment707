import { BrowserRouter, Routes, Route } from "react-router-dom"
import FBXViewer from "./components/FBXViewer"
import FirstPage from "./Pages/FirstPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage/>} />
        <Route path="/play" element={<FBXViewer/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
