import React from 'react'
import Register from './Pages/Register/Register'
import Login from './Pages/loging/Login'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import 'react-toastify/dist/ReactToastify.css'
import Update from './Pages/Update/Update'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path='/signup' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/update' element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App