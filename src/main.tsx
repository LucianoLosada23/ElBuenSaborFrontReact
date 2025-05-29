import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Agregamos el Provider aquí */}
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        toastClassName="!bg-white !text-black !rounded-xl !shadow-lg"
        closeButton={false}
      />
    </Provider>
  </StrictMode>,
)
