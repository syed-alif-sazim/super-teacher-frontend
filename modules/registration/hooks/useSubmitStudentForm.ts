import { TStudentForm } from "../components/StudentForm/StudentForm.types";
import { useRegisterMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { IUser } from '@/shared/typedefs';
import { ERoles} from "@/shared/typedefs"
import {EEducationLevel} from "@/shared/typedefs"

const useSubmitStudentForm = () => {
    const [register] = useRegisterMutation();

    const submitStudentForm =(formData: TStudentForm) => {
        
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
            register(student);
        } catch (error) {
        }
    }
    return { submitStudentForm }
}

export default useSubmitStudentForm
