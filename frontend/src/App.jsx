import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import TransactionPage from './pages/TransactionPage'
import NotFoundPage from './pages/NotFoundPage'
import Header from './components/ui/Header'
import { useQuery } from '@apollo/client'
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query'
import { Toaster } from 'react-hot-toast'



function App() {

 
// calling query that we have created in  user.query
const{loading , data , error}= useQuery(GET_AUTHENTICATED_USER)
console.log("Authenticated data" , data);
if(loading) return null;
  return ( 
    <>
    {data?.authUser &&<Header/>}
    <Routes>
      <Route path='/' element={data.authUser?<HomePage/>:<Navigate to = '/login'/>}/>
      <Route path='/login' element={!data.authUser?<LoginPage/>:<Navigate to = '/'/>}/>
      <Route path='/signup'element={!data.authUser?<SignupPage/>:<Navigate to = '/'/>}/>
      <Route path= '/transaction/:id' element={data.authUser?<TransactionPage/>:<Navigate to = '/login'/>}/>
      <Route path ='*' element={<NotFoundPage/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
