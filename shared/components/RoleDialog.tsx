import React from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/shadui/dialog'
import { RiBookLine } from "react-icons/ri";
import { LuGraduationCap } from "react-icons/lu";
import { useRouter } from 'next/router';

const RoleDialog = ({ isDialogOpen, onClose }: { isDialogOpen: boolean; onClose: () => void }) => {
    const router = useRouter();

    const handleStudentClick = () => {
      router.push('/register/student');
    };
    const handleTeacherClick = () => {
        router.push('/register/teacher');
      };
    return (
    <div>
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
        <DialogOverlay />
        <DialogContent className='bg-white w-[80%]'>
        <DialogHeader>
            <DialogTitle className='text-center text-black font-bold'>Choose your role</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col sm:flex-row justify-between items-center text-black'>
            <div onClick={handleStudentClick} className='dialog-student-box rounded-[8px]'>
                <RiBookLine />
                Student
            </div>
            <div onClick={handleTeacherClick} className='dialog-teacher-box rounded-[8px]'>
            <LuGraduationCap />
            Teacher
            </div>
        </div>

        </DialogContent>
    </Dialog>
    </div>
    )
}

export default RoleDialog
