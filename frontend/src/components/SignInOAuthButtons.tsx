import { useSignIn } from '@clerk/clerk-react'
// import React from 'react'
import { Button } from './ui/button'

const SignInOAuthButtons = () => {
    const {signIn,isLoaded} = useSignIn()

    if(!isLoaded){
        return null
    }

    const signWithGoogle = ()=>{
        signIn.authenticateWithRedirect({
            strategy:"oauth_google",
            redirectUrl:"/sso-callback",
            redirectUrlComplete:"/auth-callback"
        })
    }

    
  return (
    <Button onClick={signWithGoogle} variant={'secondary'} className='w-full text-white border-zinc-300 h-1'>
        Continue With google
    </Button>
  )
}

export default SignInOAuthButtons