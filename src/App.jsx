import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { RouterProvider } from 'react-router-dom'

import router from './router'
import { Provider, useDispatch } from 'react-redux'
import refreshToken from './utils/authToken'





function App() {
  const dispatch = useDispatch()
  refreshToken(dispatch)
  return (
    
      <RouterProvider router={router} />
    
  )
}

export default App
