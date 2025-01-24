import { useVerifyOtpMutation} from "@/shared/redux/rtk-apis/auth/auth.api";
import { toast } from "sonner";
import { TOtpForm } from "./OtpForm.types";

const useSubmitOtpForm = () => {
    const [verifyOtp] =  useVerifyOtpMutation();

    const submitOtpForm = async (formData: TOtpForm , email: string) => {
        try {
            const payload={
                email: email,
                code: formData.code
            }
            const response = await verifyOtp(payload).unwrap();
            toast.success("Otp has been verified", {
                description: 'You can now set a new password',
            });
            return true
        } catch (error) {
            toast.error("Invalid Otp", {
                description: 'Your otp is invalid. Please try again.',
            });
            return false
        }
    };
    return { submitOtpForm }
}

export default useSubmitOtpForm
