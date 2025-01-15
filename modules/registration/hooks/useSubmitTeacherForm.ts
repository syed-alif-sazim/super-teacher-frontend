import { useAppDispatch } from "@/shared/redux/hooks";
import { TTeacherForm } from "../components/TeacherForm/TeacherForm.types";
import { useRegisterMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { IUser } from '@/shared/typedefs';
import { ERoles} from "@/shared/typedefs"
import { setAttemptsLeft } from "@/shared/redux/reducers/attemptsLeft.reducer";
import { toast } from "sonner";

const useSubmitTeacherForm = () => {
    const [register] = useRegisterMutation();
    const dispatch = useAppDispatch();

    const submitTeacherForm = async (formData: TTeacherForm) => {
        const teacher: IUser = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            role: ERoles.Teacher,
            email: formData.email,
            password: formData.confirmPassword,
            teacherForm: {
                code: formData.code,
                majorSubject : formData.majorSubject,
                highestEducationLevel: formData.highestEducationLevel,
                subjectsToTeach: formData.subjects
            },
        };
        try {
            const response = await register(teacher).unwrap(); 
            if (response.attemptsLeft !== undefined) {
                dispatch(setAttemptsLeft(response.attemptsLeft)); 
            }
            if (response.message) {
                toast.error(response.message); 
            }
            console.log("Register response:", response);
        } catch (error: any) {
            console.error("Error registering teacher:", error);
            if (error?.data?.message) {
                toast.error(error.data.message);
            }
        }
    }
    return { submitTeacherForm }
}

export default useSubmitTeacherForm
