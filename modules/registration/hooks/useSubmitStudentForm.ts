import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { TStudentForm } from "../components/StudentForm/StudentForm.types";
import { useLoginMutation, useRegisterMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { IUser } from '@/shared/typedefs';
import { ERoles} from "@/shared/typedefs"
import {EEducationLevel} from "@/shared/typedefs"
import { setInLocalStorage } from "@/shared/utils/localStorage";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useRouter } from "next/router";

const useSubmitStudentForm = () => {
    const [register] = useRegisterMutation();
    const [login] = useLoginMutation();
    const { getMe } = useSessionContext();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const submitStudentForm =async (formData: TStudentForm) => {
        
        const student: IUser = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            role: ERoles.Student,
            email: formData.email,
            password: formData.confirmPassword,
            studentForm: {
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                educationLevel: formData.educationLevel,
                ...(formData.educationLevel === EEducationLevel.School || formData.educationLevel === EEducationLevel.College
                    ? {
                        medium: formData.medium,
                        grade: formData.grade,
                    }
                    : {}),
                ...(formData.educationLevel === EEducationLevel.University
                    ? {
                        degree: formData.degree,
                        degreeName: formData.degreeName,
                        semesterYear: formData.semesterYear,
                    }
                    : {}),
            },
        };
        try {
            await register(student);

            const loginData = await login({ email: formData.email, password: formData.confirmPassword }).unwrap();
            setInLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, loginData.accessToken);
            dispatch(setUser(loginData.user));
            await router.replace("/dashboard");
            await getMe().unwrap();
        } catch (error) {
        }
    }
    return { submitStudentForm }
}

export default useSubmitStudentForm
