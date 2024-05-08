import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AIToolAdminPage from './pages/AIToolAdminPage';
import CategoriasAdminPage from './pages/CategoriasAdminPage';
import FavoritosPage from './pages/FavoritosPage';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AIToolAdminPage />} />
          <Route path='/categorias' element={<CategoriasAdminPage />} />
          <Route path='/favoritos' element={<FavoritosPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
