import Navbar from '@/shared/components/Navbar'
import React from 'react'
import CreateClassroomDialog from '../components/CreateClassroomDialog/CreateClassroomDialog'
import { useState } from 'react'

const DashboardContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div>
      <Navbar setIsDialogOpen={setIsDialogOpen}/>
      <CreateClassroomDialog  isDialogOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}/>
    </div>
  )
}

export default DashboardContainer
