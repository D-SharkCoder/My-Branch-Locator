import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import BranchLocator from './pages/BranchLocator.tsx'
import MainLayout from './layout/MainLayout.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MainLayout>
        <BranchLocator />
      </MainLayout>
    </BrowserRouter>
  </StrictMode>,
)
