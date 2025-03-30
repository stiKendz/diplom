import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Header from './components/header/Header'
import MainPageContent from './components/page-content/main-page-content/MainPageContent'
import Footer from './components/footer/Footer'

import './styles/mainStyles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <MainPageContent />
    <Footer />  
  </StrictMode>,
)
