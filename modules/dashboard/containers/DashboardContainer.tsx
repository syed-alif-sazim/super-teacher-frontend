import Navbar from '@/shared/components/Navbar'
import React from 'react'
import CreateClassroomDialog from '../components/CreateClassroomDialog/CreateClassroomDialog'
import { useState } from 'react'
import ClassroomsContainer from './ClassroomsContainer'

const DashboardContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div>
      <Navbar setIsDialogOpen={setIsDialogOpen}/>
      <CreateClassroomDialog  isDialogOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}/>
      <ClassroomsContainer/>
    </div>
  )
}

export default DashboardContainer
