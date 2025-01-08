import React from 'react'
import { Button } from '@/shared/components/shadui'
import { useRouter } from 'next/router'
import RoleDialog from '../components/RoleDialog'
import { useState } from 'react'

const LandingContainer = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleRegisterClick = () => {
      setIsDialogOpen(true) // Open dialog when Register button is clicked
    }
    return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <div className='w-[900px] flex flex-col items-center'>
            <h1 className='text-center text-white text-4xl lg:text-6xl font-bold mb-3'>WELCOME TO SUPERTEACHER</h1>
            <h2 className='text-center text-white md-text-xl lg:text-2xl mb-3'>Where learning and teaching come together!</h2>
            <div className='flex justify-center'>
                <Button onClick={handleRegisterClick} className='text-custom-green px-4 py-2 border-custom-green border-2 border-solid rounded-[5px] hover:bg-custom-green hover:text-white transition-all mr-3'>Register</Button>
                <Button className='text-custom-green px-4 py-2 border-custom-green border-2 border-solid rounded-[5px] hover:bg-custom-green hover:text-white transition-all mr-3'>Login</Button>
            </div>
        </div>
        <RoleDialog isDialogOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  )
}

export default LandingContainer
