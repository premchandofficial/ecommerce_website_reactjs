import React from 'react'
import ReactDOM from 'react-dom/client'
//import AppContext from "./components/context/AppContext"
import App from './App.jsx'
import './index.css'
//import { BrowserRouter } from 'react-router-dom'
import { store } from './reduxtoolkit/store.jsx'
import {Provider} from "react-redux"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
        <App/>
    </Provider>
       
    
    
  </React.StrictMode>
)
