import React from 'react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/shadui/dialog';
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
    Button,
  } from "@/shared/components/shadui"
import MultipleSelector from '@/shared/components/MultipleSelector/MultipleSelector';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddStudentFormSchema } from './AddStudentForm.schema';
import { TAddStudentForm } from './AddStudentForm.types';
import { cn } from '@/lib/utils';
import { useGetUnenrolledStudentsQuery } from '@/shared/redux/rtk-apis/classrooms/classrooms.api';
import { TUnenrolledStudent } from '@/shared/redux/rtk-apis/classrooms/classroom.types';
import { useSubmitAddStudentForm } from '../../hooks/useSubmitAddStudentForm';

const AddStudentDialog = ({ isDialogOpen, onClose, classroomId}: { isDialogOpen: boolean; onClose: () => void; classroomId: string}) => {
    const {data: unenrolledStudents}= useGetUnenrolledStudentsQuery(classroomId);
    
    const form = useForm<TAddStudentForm>({
        resolver: zodResolver(AddStudentFormSchema),
        mode: "onChange",
    });
    const {formState: { errors }, handleSubmit  } = form

    const { submitAddStudentForm} = useSubmitAddStudentForm()

    const handleFormSubmit = (data: TAddStudentForm) => { 
      submitAddStudentForm(data, classroomId); 
      onClose()
    };

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        onClose();
    };


    return (
        <div>
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogOverlay />
            <DialogContent className='bg-white w-[300px] sm:w-[550px]'>
            <DialogHeader>
                <DialogTitle className="text-center sm:text-left text-black font-bold text-2xl">Add Student</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
                <Form {...form} >
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <FormField
                            control={form.control}
                            name="students"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <MultipleSelector
                                    defaultOptions={unenrolledStudents?.map((student:TUnenrolledStudent) => ({
                                        value: student.id.toString(),
                                        label: `${student.user.firstName} ${student.user.lastName} (${student.user.email})`,
                                    }))}
                                    placeholder="Search students"
                                    onChange={(selectedOptions) => {
                                        const selectedValues = selectedOptions.map((option) => option.value);
                                        field.onChange(selectedValues);
                                    }}
                                    className='bg-white'
                                    badgeClassName="bg-gray-300 hover:bg-gray-400"
                                />
                                {errors?.students?.message ? (
                                    <FormMessage className={cn("text-red-500 mt-1 h-1")}>
                                    {errors.students.message}
                                    </FormMessage>
                                ) : (
                                    <div className="mt-1 h-1"></div>
                                )}
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-center sm:justify-end mt-7'>
                        <Button onClick={handleCancelClick}  className="bg-purple-600 text-white hover:bg-purple-700 rounded-[5px] mr-5">
                            Cancel
                        </Button>
                        <Button type="submit" variant="ghost" className="bg-custom-green text-white hover:bg-green-700 rounded-[5px]">
                            Add
                        </Button>
                        
                        </div>
                    </form>
                </Form>
            </div>
            </DialogContent>
        </Dialog>
        </div>
    );
};

export default AddStudentDialog;
