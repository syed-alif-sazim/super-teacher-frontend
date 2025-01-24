import { useAppDispatch } from "@/shared/redux/hooks";
import { TTeacherForm } from "../components/TeacherForm/TeacherForm.types";
import { useRegisterMutation, useLoginMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { IUser } from '@/shared/typedefs';
import { ERoles} from "@/shared/typedefs"
import { setAttemptsLeft } from "@/shared/redux/reducers/attemptsLeft.reducer";
import { toast } from "sonner";
import { setInLocalStorage } from "@/shared/utils/localStorage";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { useRouter } from "next/router";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";

const useSubmitTeacherForm = () => {
    const [register] = useRegisterMutation();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();
    const { getMe } = useSessionContext();
    const router = useRouter();

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
            if (response.message === "Teacher account has been registered successfully!") {
                const loginData = await login({ email: formData.email, password: formData.confirmPassword }).unwrap();
                setInLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, loginData.accessToken);
                dispatch(setUser(loginData.user));
                await router.replace("/dashboard");
                await getMe().unwrap();
            }
            if (response.message) {
                toast.error(response.message); 
            }
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error.data.message);
            }
        }
    }
    return { submitTeacherForm }
}

export default useSubmitTeacherForm
