import React from 'react'
import { Dialog, DialogOverlay, DialogContent } from '@/shared/components/shadui/dialog'
import { TEnrolledStudent } from '@/shared/redux/rtk-apis/classrooms/classroom.types';
import { Button } from '@/shared/components/shadui';
import { useRemoveStudentMutation } from '@/shared/redux/rtk-apis/classrooms/classrooms.api';
import { toast } from "sonner";

const RemoveStudentDialog = ({ isDialogOpen, onClose, student, classroomId}: { isDialogOpen: boolean; onClose: () => void; student: TEnrolledStudent; classroomId: number }) => {

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        onClose();
    };

    const [removeStudent] = useRemoveStudentMutation()

    const handleRemoveClick = async () => {
        try {
            const payload = {
                'id' : classroomId,
                'student' : {
                    'studentId' : student.id,
                }
            };
          await removeStudent(payload);
          onClose();
          toast.success("Success", {
            description: "The student has been removed from this class.",
          });
        } catch (error) {
          toast.error("Error", {
            description: "There was an issue removing the student from the class.",
          });
        }
      };
      
    return (
    <div>
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
        <DialogOverlay />
        <DialogContent className='bg-white w-[300px] sm:w-[550px]'>
        <p className='text-black'>Are you sure you want to remove {student.user.email}?</p>
        <div className='flex justify-center sm:justify-end mt-3'>
            <Button onClick={handleCancelClick}  className="bg-purple-600 text-white hover:bg-purple-700 rounded-[5px] mr-5">
                Cancel
            </Button>
            <Button onClick={handleRemoveClick}  className="bg-red-600 text-white hover:bg-red-700 rounded-[5px]">
                Remove
            </Button>  
        </div>
        </DialogContent>
    </Dialog>
    </div>
    )
}

export default RemoveStudentDialog