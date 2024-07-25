import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QuickstartProvider } from "./PlaidContext";
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuickstartProvider>
      <App />
    </QuickstartProvider>
  </React.StrictMode>,
)
