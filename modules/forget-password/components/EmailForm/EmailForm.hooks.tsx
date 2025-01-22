import {  useForgotPasswordMutation} from "@/shared/redux/rtk-apis/auth/auth.api";
import { toast } from "sonner";

const useSubmitEmailForm = () => {
    const [forgotPassword, { isLoading }] =  useForgotPasswordMutation();

    const submitEmailForm = async (formData: { email: string }) => {
        try {
            const response = await forgotPassword(formData.email).unwrap();
            toast.success("OTP sent to your email", {
                description: response.message,
            });
            return true
        } catch (error) {
            toast.error("Email not found", {
                description: 'The email is not registered',
            });
            return false
        }
    };
    return { submitEmailForm, isLoading };
}

export default useSubmitEmailForm
