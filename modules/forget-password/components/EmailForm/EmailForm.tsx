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
import { TEmailForm } from './EmailForm.types';
import { EmailFormSchema } from './EmailForm.schema';
import { cn } from "@/lib/utils"
import useSubmitEmailForm from './EmailForm.hooks';

const EmailForm = ({ onClose, onSuccess, setEmail }: { onClose: () => void; onSuccess: () => void; setEmail: React.Dispatch<React.SetStateAction<string>>; }) => {
    const form = useForm<TEmailForm>({
      resolver: zodResolver(EmailFormSchema),
      mode: "onChange",
    });

    const {formState: { errors }, handleSubmit  } = form

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault(); 
      onClose();
    };

    const { submitEmailForm} = useSubmitEmailForm()

    const handleFormSubmit =async (data: TEmailForm) => { 
      const response = await submitEmailForm(data); 
      if (response) {
        setEmail(data.email);
        onSuccess(); 
      }
    };

    return (
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className='text-custom-green text-md font-bold'>Email</FormLabel>
                  <FormControl >
                    <Input {...field} className="bg-white rounded-[5px]"  />
                  </FormControl>
                  <p className='text-gray-400'>
                    Enter your registered email
                  </p>
                  <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["email"]? " opacity-0" :"" )} >
                    {errors["email"]?.message?.toString() || " "}
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

export default EmailForm
