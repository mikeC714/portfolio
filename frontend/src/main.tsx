import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styling/page.styling.css";
import "./styling/navbar.styling.css";
import "./styling/contactbar.styling.css";
import "./styling/eventbar.styling.css";
import "./styling/about.styling.css";
import "./styling/projects.styling.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
