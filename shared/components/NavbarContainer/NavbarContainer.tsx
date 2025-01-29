import Navbar from '@/shared/components/Navbar'
import React from 'react'
import CreateClassroomDialog from '@/modules/dashboard/components/CreateClassroomDialog/CreateClassroomDialog'
import { useState } from 'react'

const NavbarContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div>
      <Navbar setIsDialogOpen={setIsDialogOpen}/>
      <CreateClassroomDialog  isDialogOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}/>
    </div>
  )
}

export default NavbarContainer
