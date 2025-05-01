

import './App.css'
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthCallBackPage from './pages/auth-callback/AuthCallBackPage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'

function App() {
  

  return (
    <>
      <Routes>
        <Route path = "/" element= {<HomePage/>}/>
        <Route path = "/sso-callback"
         element= {<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>}/>
        <Route path = "/auth-callback" element= {<AuthCallBackPage/>}/>


      </Routes>
    </>
  )
}

export default App
