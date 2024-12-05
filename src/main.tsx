import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ToastContainer
        autoClose={3000}
        draggable
        closeOnClick
        theme='dark'
        pauseOnHover
        position='top-center'
      />
    <Router />
  </StrictMode>,
)
