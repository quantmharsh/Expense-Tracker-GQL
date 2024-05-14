import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import TransactionPage from './pages/TransactionPage'
import NotFoundPage from './pages/NotFoundPage'
import Header from './components/ui/Header'



function App() {

const authUser=false;  
  return ( 
    <>
    {authUser &&<Header/>}
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup'element={<SignupPage/>}/>
      <Route path= '/transaction/:id' element={<TransactionPage/>}/>
      <Route path ='*' element={<NotFoundPage/>}/>
    </Routes>
    </>
  )
}

export default App
