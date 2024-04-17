import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import AIToolAdminPage from './pages/AIToolAdminPage';
import CategoriasAdminPage from './pages/CategoriasAdminPage';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AIToolAdminPage />} />
          <Route path='/categorias' element={<CategoriasAdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
