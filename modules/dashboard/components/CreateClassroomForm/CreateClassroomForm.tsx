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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadui"
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils"
import { CreateClassroomFormSchema } from './CreateClassroomForm.schema';
import MultipleSelector from '@/shared/components/MultipleSelector/MultipleSelector';
import { EDays, ESubjects } from '@/shared/typedefs';
import { TCreateClassroomForm } from './CreateClassroomForm.types';
import useCreateClassroomForm from './CreateClassroomForm.hooks';


const CreateClassroomForm = ({ onClose }: { onClose: () => void }) => {
    const form = useForm<TCreateClassroomForm>({
      resolver: zodResolver(CreateClassroomFormSchema),
      mode: "onChange",
    });

    const {formState: { errors }, handleSubmit  } = form

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault(); 
      onClose();
    };

    const { submitCreateClassroomForm} = useCreateClassroomForm()

    const handleFormSubmit = async (data: TCreateClassroomForm) => {
      await submitCreateClassroomForm(data); 
      onClose();
    };

    return (
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col space-y-4 md:space-y-0 ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className='text-custom-green text-md font-bold'>Title</FormLabel>
                  <FormControl >
                    <Input {...field} placeholder='Enter a title' className="bg-white rounded-[5px]"  />
                  </FormControl>
                  <FormMessage className={cn("text-red-500 mt-1 h-4",!errors["title"]? " opacity-0" :"" )} >
                    {errors["title"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
        <FormField
          control={form.control}
          name="days"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className='text-custom-green text-md font-bold'>Days Of The Week</FormLabel>
              <MultipleSelector
                defaultOptions={Object.values(EDays).map((day) => ({
                  value: day,
                  label: day,
                }))}
                placeholder="Pick your preferred days"
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map((option) => option.value);
                  field.onChange(selectedValues);
                }}
                className='bg-white'
                badgeClassName="bg-gray-300 hover:bg-gray-400"
              />
              {errors?.days?.message ? (
                <FormMessage className={cn("text-red-500 mt-1 h-4")}>
                  {errors.days.message}
                </FormMessage>
              ) : (
                <div className="mt-1 h-4"></div>
              )}
            </FormItem>
          )}
        />
          <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className='text-custom-green text-md font-bold'>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black">
                      {Object.values(ESubjects).map((subject) => (
                        <SelectItem key={subject} value={subject} className="focus:bg-white focus:text-black">
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={cn("text-red-500 mt-1 h-4",!errors["subject"]? " opacity-0" :"" )} >
                    {errors["subject"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="classTime"
            render={({ field }) => (
              <FormItem className="flex-1 relative">
                <FormLabel className="text-custom-green text-md font-bold">Time</FormLabel>
                <FormControl>
                  <div className="relative">
                    <input
                      type="time"
                      id="classTime"
                      className={cn(
                        "border border-input px-3 py-2 rounded-md bg-white w-[100%]"
                      )}
                      {...field}
                      
                    />
                  <p className='ml-1 text-gray-400 text-sm'>
                    HH:MM AM/PM
                  </p>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 mt-1 h-4">
                  {errors["classTime"]?.message?.toString() || " "}
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

export default CreateClassroomForm
