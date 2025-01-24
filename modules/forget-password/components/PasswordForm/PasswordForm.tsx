import React from 'react'
import { useForm} from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
} from "@/shared/components/shadui"
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils"
import { TPasswordForm } from './PasswordForm.types';
import { PasswordFormSchema } from './PasswordForm.schema';
import useSubmitPasswordForm from './PasswordForm.hooks';
import { PasswordInput } from '@/shared/components/Form/PasswordInput';

const OtpForm = ({ email, onClose}: { email: string, onClose: () => void}) => {
    const form = useForm<TPasswordForm>({
      resolver: zodResolver(PasswordFormSchema),
      mode: "onChange",
    });

    const {formState: { errors }, handleSubmit  } = form

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault(); 
      onClose();
    };

    const { submitPasswordForm } = useSubmitPasswordForm()

    const handleFormSubmit = async (data: TPasswordForm) => { 
      const response = await submitPasswordForm(data, email);
      
      if(response){
        onClose(); 
      }
    };

    return (
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col space-y-4 md:space-y-0 ">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green text-md font-bold'>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your password"
                    {...field}
                    className="bg-white"
                    isError={false}
                  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1",!errors["password"]? " opacity-0" :"" )} >
                  {errors["password"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green text-md font-bold'>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirm your password"
                    {...field}
                    className="bg-white"
                    isError={false}
                  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["confirmPassword"]? " opacity-0" :"" )} >
                  {errors["confirmPassword"]?.message?.toString() || " "}
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