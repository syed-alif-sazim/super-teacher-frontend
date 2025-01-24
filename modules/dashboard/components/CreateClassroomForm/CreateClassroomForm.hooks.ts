import { useCreateClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { toast } from "sonner";
import { TCreateClassroomForm } from "./CreateClassroomForm.types";
import { timeStringToDate } from "./CreateClassroomForm.helpers";

const useCreateClassroomForm = () => {
    const [createClassroom] =  useCreateClassroomMutation();

    const submitCreateClassroomForm = async (formData: TCreateClassroomForm ) => {
        try {
            const payload={
                title: formData.title,
                days: formData.days,
                subject: formData.subject,
                classTime: timeStringToDate(formData.classTime)
            }
            await createClassroom(payload).unwrap();
            toast.success("Success", {
                description: 'New classroom has been created successfully.',
            });
            return true
        } catch (error) {
            return false
        }
    };
    return { submitCreateClassroomForm }
}

export default useCreateClassroomForm