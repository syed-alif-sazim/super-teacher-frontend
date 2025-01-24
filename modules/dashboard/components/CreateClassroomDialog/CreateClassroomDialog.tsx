import React, { useState } from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/shadui/dialog'
import CreateClassroomForm from '../CreateClassroomForm/CreateClassroomForm';

const CreateClassroomDialog = ({
  isDialogOpen,
  onClose,
}: {
  isDialogOpen: boolean;
  onClose: () => void;
}) => {

    return (
    <div >
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
        <DialogOverlay />
        <DialogContent className= 'bg-white w-[300px] sm:w-[550px]'>
        <DialogHeader>
            <DialogTitle className='text-1xl sm:text-2xl text-center sm:text-left text-custom-green font-bold mb-2'>CREATE A CLASSROOM</DialogTitle>
        </DialogHeader>
          <CreateClassroomForm onClose={onClose} />
        </DialogContent>
    </Dialog>
    </div>
    )
}

export default CreateClassroomDialog
