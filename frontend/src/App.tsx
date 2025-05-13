

import './App.css'
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthCallBackPage from './pages/auth-callback/AuthCallBackPage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './layout/MainLayout.js'
import Chatpage from './pages/chat/Chatpage.js'
import AlbumPage from './pages/home/album/AlbumPage.js'
import AdminPage from './pages/admin/AdminPage.js'

function App() {
  

  return (
    <>
      <Routes>
        <Route path = "/sso-callback"
         element= {<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>}/>
        <Route path = "/auth-callback" element= {<AuthCallBackPage/>}/>
        <Route path = "/admin" element= {<AdminPage/>}/>

        <Route element = {<MainLayout/>}>
            <Route path = '/' element= {<HomePage/>}/>
            <Route path = '/chat' element= {<Chatpage/>}/>
            <Route path = '/albums/:albumId' element= {<AlbumPage/>}/>
        </Route>


      </Routes>
    </>
  )
}

export default App
