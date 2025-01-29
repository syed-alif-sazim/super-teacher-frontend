import { useAddStudentsMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { toast } from "sonner";

const useSubmitAddStudentForm = () => {
    const [addStudent, { isLoading }] =  useAddStudentsMutation()

    const submitAddStudentForm = async (formData: { students: string[]},id: string) => {
        try {
            const payload = {
                'id' : id,
                'students' : {
                    'students' : formData.students.map(Number)
                }
            };
            const response = await addStudent(payload).unwrap();
            toast.success("Students added successfully", {
                description: response.message,
            });
            return true
        } catch (error) {
            toast.error("Failed to add students", {
                description: "Something went wrong",
            });
            return false
        }
    };
    return { submitAddStudentForm, isLoading };
}

export { useSubmitAddStudentForm };