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
  SelectValue
} from "@/shared/components/shadui"
import {EGender, EHighestEducationLevel,ESubjects } from "@/shared/typedefs"
import { PasswordInput } from "@/shared/components/Form/PasswordInput"
import { TeacherFormSchema } from "./TeacherForm.schema"
import { zodResolver } from "@hookform/resolvers/zod";
import useSubmitTeacherForm from "../../hooks/useSubmitTeacherForm"
import { TTeacherForm } from "./TeacherForm.types"
import { cn } from "@/lib/utils"
import MultipleSelector from "@/shared/components/MultipleSelector/MultipleSelector"
import { useSelector } from "react-redux";
import { TRootState } from "@/shared/redux/store";

const TeacherForm = () => {
  const form = useForm<TTeacherForm>({
    resolver: zodResolver(TeacherFormSchema),
    mode: "onChange",
  });
  const {formState: { errors }, handleSubmit  } = form

  const { submitTeacherForm } = useSubmitTeacherForm()

  const attemptsLeft = useSelector((state: TRootState) => state.attemptsLeft.attemptsLeft);
  
  return (
    <div className="rounded-md p-4" style={{ width: "900px" }}>
      <div className="text-center mb-5 mt-5">
        <h1 className="text-3xl font-bold text-custom-green">REGISTER AS A TEACHER</h1>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(submitTeacherForm)}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green'>Enter registration code</FormLabel>
                <FormControl >
                  <Input placeholder="Enter unique code e.g ce47Wp" {...field} className="bg-white rounded-[5px]"  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-3",!errors["code"]? " opacity-0" :"" )} >
                  {errors["code"]?.message?.toString() || " "}
                </FormMessage>
                <div>
                  <p className='text-sm text-white'>
                    {attemptsLeft === 0 ? "No attempts left" : `${attemptsLeft} attempts left`}
                  </p>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-1">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green'>First Name</FormLabel>
                <FormControl >
                  <Input placeholder="Enter your first name" {...field} className="bg-white rounded-[5px]"  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["firstName"]? " opacity-0" :"" )} >
                  {errors["firstName"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green'>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} className="bg-white rounded-[5px]"  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["lastName"]? " opacity-0" :"" )} >
                  {errors["lastName"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-custom-green">Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black">
                      {Object.values(EGender).map((gender) => (
                        <SelectItem key={gender} value={gender} className="focus:bg-white focus:text-black">
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["gender"]? " opacity-0" :"" )} >
                    {errors["gender"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <FormField
            control={form.control}
            name="majorSubject"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green'>Major Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your field of specialization" {...field} className="bg-white rounded-[5px]"  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["majorSubject"]? " opacity-0" :"" )} >
                  {errors["majorSubject"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="highestEducationLevel"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-custom-green">Highest Education Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black">
                      {Object.values(EHighestEducationLevel).map((educationLevel) => (
                        <SelectItem key={educationLevel} value={educationLevel} className="focus:bg-white focus:text-black">
                          {educationLevel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["highestEducationLevel"]? " opacity-0" :"" )} >
                    {errors["highestEducationLevel"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
        <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-custom-green">Subjects to teach</FormLabel>
              <MultipleSelector
                defaultOptions={Object.values(ESubjects).map((subject) => ({
                  value: subject,
                  label: subject,
                }))}
                placeholder="Select subjects you want to teach"
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map((option) => option.value);
                  field.onChange(selectedValues);
                }}
                className='bg-white'
                badgeClassName="bg-gray-300 hover:bg-gray-400"
              />
              {errors?.subjects?.message ? (
                <FormMessage className={cn("text-red-500 mt-1 h-1")}>
                  {errors.subjects.message}
                </FormMessage>
              ) : (
                <div className="mt-1 h-1"></div>
              )}
            </FormItem>
          )}
        />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green'>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} className="bg-white rounded-[5px]"  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["email"]? " opacity-0" :"" )} >
                  {errors["email"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green'>Password</FormLabel>
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
                <FormLabel className='text-custom-green'>Confirm Password</FormLabel>
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
      <div className="flex justify-around mt-10">
        <Button
          type="button"
          variant="outline"
          className="bg-purple-600 text-white hover:bg-purple-700 rounded-[5px] border-none"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="ghost"
          className="bg-custom-green text-white hover:bg-green-700 rounded-[5px]"
        >
          Submit
        </Button>
      </div>
      </form>
      </Form>
      <div className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-white hover:underline">
            Login
          </a>
        </p>
        <p>
          <a href="/register" className="text-white hover:underline">
            Register
          </a>
        </p>
      </div>

    </div>
  )
}

export default TeacherForm
