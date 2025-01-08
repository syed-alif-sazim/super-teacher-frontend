import React from 'react'
import { Button } from '@/shared/components/shadui'
import RoleDialog from '../components/RoleDialog'
import { useState } from 'react'

const LandingContainer = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleRegisterClick = () => {
      setIsDialogOpen(true) 
    }
    return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <div className='w-[900px] flex flex-col items-center'>
            <h1 className='welcome-landing-page'>WELCOME TO SUPERTEACHER</h1>
            <h2 className='slogan-landing-page'>Where learning and teaching come together!</h2>
            <div className='flex justify-center'>
                <Button onClick={handleRegisterClick} className='btn-landing-page rounded-[5px] hover:bg-custom-green mr-3'>Register</Button>
                <Button className='btn-landing-page rounded-[5px] hover:bg-custom-green mr-3'>Login</Button>
            </div>
        </div>
        <RoleDialog isDialogOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  )
}

export default LandingContainer