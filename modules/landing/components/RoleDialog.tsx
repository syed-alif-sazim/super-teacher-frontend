import React from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogFooter, DialogClose, DialogTitle } from '@/shared/components/shadui/dialog'
import { RiBookShelfLine } from "react-icons/ri";
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
            <div onClick={handleStudentClick} className='mb-2 sm:mb-0 text-xl flex items-center justify-center w-[100%] sm:w-[48%] h-[200px] sm:h-[300px] border-2 border-black py-6 cursor-pointer font-bold rounded-[8px]'>
                <RiBookShelfLine />
                Student
            </div>
            <div onClick={handleTeacherClick} className='text-xl flex items-center justify-center  w-[100%] sm:w-[48%] h-[200px] sm:h-[300px] border-2 border-black text-center py-6 cursor-pointer font-bold rounded-[8px]'>
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

