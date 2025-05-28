import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CustomHook from './custom1.jsx'
import { CustomHook2 } from './custom2.jsx'
import { CustomHook3 } from './custom3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomHook3 />
  </StrictMode>,
)
