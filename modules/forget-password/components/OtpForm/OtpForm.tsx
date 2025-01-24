import React from 'react'
import { useForm} from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from "@/shared/components/shadui"
import { zodResolver } from "@hookform/resolvers/zod";
import { TOtpForm } from './OtpForm.types';
import { OtpFormSchema } from './OtpForm.schema';
import { cn } from "@/lib/utils"
import useSubmitOtpForm from './OtpForm.hooks';

const OtpForm = ({ email, onClose, onSuccess}: { email: string, onClose: () => void; onSuccess: () => void}) => {
    const form = useForm<TOtpForm>({
      resolver: zodResolver(OtpFormSchema),
      mode: "onChange",
    });

    const {formState: { errors }, handleSubmit  } = form

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault(); 
      onClose();
    };

    const { submitOtpForm } = useSubmitOtpForm()

    const handleFormSubmit = async (data: TOtpForm) => { 
      const response = await submitOtpForm(data, email);
      
      if(response){
        onSuccess(); 
      }
    };

    return (
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className='text-custom-green text-md font-bold'>Code</FormLabel>
                  <FormControl >
                    <Input {...field} className="bg-white rounded-[5px]"  />
                  </FormControl>
                  <p className='text-gray-400'>
                    Check your email for OTP
                  </p>
                  <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["code"]? " opacity-0" :"" )} >
                    {errors["code"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-center sm:justify-end mt-7'>
            <Button onClick={handleCancelClick}  className="bg-purple-600 text-white hover:bg-purple-700 rounded-[5px] mr-5">
              Cancel
            </Button>
            <Button type="submit" variant="ghost" className="bg-custom-green text-white hover:bg-green-700 rounded-[5px]">
              Submit
            </Button>
            
          </div>
          </form>
        </Form>
    )

}

export default OtpForm
