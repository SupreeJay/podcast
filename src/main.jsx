import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './context/favoriteContext.jsx'
import { SearchProvider } from './components/searchContext.jsx'


createRoot(document.getElementById('root')).render(

    <FavoritesProvider> 
      <SearchProvider> 
      <BrowserRouter>
      <App />
      </BrowserRouter>
       </SearchProvider>
    </FavoritesProvider>
)
