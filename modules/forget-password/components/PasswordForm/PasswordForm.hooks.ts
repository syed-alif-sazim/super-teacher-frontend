import { useResetPasswordMutation} from "@/shared/redux/rtk-apis/auth/auth.api";
import { toast } from "sonner";
import { TPasswordForm } from "./PasswordForm.types";

const useSubmitPasswordForm = () => {
    const [resetPassword] =  useResetPasswordMutation();

    const submitPasswordForm = async (formData: TPasswordForm , email: string) => {
        try {
            const payload={
                email: email,
                password: formData.password
            }
            const response = await resetPassword(payload).unwrap();
            toast.success("Success", {
                description: 'New password has been set successfully.',
            });
            return true
        } catch (error) {
            return false
        }
    };
    return { submitPasswordForm }
}

export default useSubmitPasswordForm
