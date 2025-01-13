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
import {EGender, EDegree, EEducationLevel, EMedium, ECollegeClass, ESchoolClass } from "@/shared/typedefs"
import { PasswordInput } from "@/shared/components/Form/PasswordInput"
import { StudentFormSchema } from "./StudentForm.schema"
import { zodResolver } from "@hookform/resolvers/zod";
import useSubmitStudentForm from "../hooks/useSubmitStudentForm"
import { TStudentForm } from "./StudentForm.types"
import { cn } from "@/lib/utils"

const StudentForm = () => {
  const form = useForm<TStudentForm>({
    resolver: zodResolver(StudentFormSchema),
    mode: "onChange",
  });
  const { watch,  formState: { errors }, handleSubmit  } = form
  const educationLevel = watch("educationLevel")

  const { submitStudentForm } = useSubmitStudentForm()

  return (
    <div className="rounded-md p-4" style={{ width: "900px" }}>
      <div className="text-center mb-5 mt-5">
        <h1 className="text-3xl font-bold text-custom-green">REGISTER AS A STUDENT</h1>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(submitStudentForm)}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
            name="address"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green'>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} className="bg-white rounded-[5px]"  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["address"]? " opacity-0" :"" )} >
                  {errors["address"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green'>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} className="bg-white rounded-[5px]"  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1",!errors["phoneNumber"]? " opacity-0" :"" )} >
                  {errors["phoneNumber"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
        <FormField
          control={form.control}
          name="educationLevel"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-custom-green">Education Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="bg-white text-black">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white text-black">
                  {Object.values(EEducationLevel).map((level) => (
                    <SelectItem key={level} value={level} className="focus:bg-white focus:text-black">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className={cn("text-red-500 mt-1 h-1", !errors["educationLevel"] ? " opacity-0" : "")}>
                {errors["educationLevel"]?.message?.toString() || " "}
              </FormMessage>
            </FormItem>
          )}
        />
        {educationLevel && (
          <>
            {educationLevel === EEducationLevel.School || educationLevel === EEducationLevel.College ? (
              <FormField
                control={form.control}
                name="medium"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-custom-green">Medium</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="bg-white text-black">
                          <SelectValue placeholder="Select your medium" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        {Object.values(EMedium).map((medium) => (
                          <SelectItem key={medium} value={medium} className="focus:bg-white focus:text-black">
                            {medium}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className={cn("text-red-500 mt-1 h-1", !errors["medium"] ? " opacity-0" : "")}>
                      {errors["medium"]?.message?.toString() || " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
            ) : educationLevel === EEducationLevel.University ? (
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-custom-green">Bachelor/Master</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="bg-white text-black">
                          <SelectValue placeholder="Select your degree" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        {Object.values(EDegree).map((degree) => (
                          <SelectItem key={degree} value={degree} className="focus:bg-grey-500 focus:text-black">
                            {degree}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className={cn("text-red-500 mt-1 h-1", !errors["degree"] ? " opacity-0" : "")}>
                      {errors["degree"]?.message?.toString() || " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
            ) : null}
          </>
        )}
        </div>
        
          {educationLevel === EEducationLevel.University && (
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
              <FormField
                control={form.control}
                name="degreeName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className='text-custom-green'>Degree Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your degree name" {...field} className="bg-white rounded-[5px]"  />
                    </FormControl>
                    <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["degreeName"]? " opacity-0" :"" )} >
                      {errors["degreeName"]?.message?.toString() || " "}
                    </FormMessage>
                    </FormItem>
                  )}
              />
              <FormField
                control={form.control}
                name="semesterYear"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className='text-custom-green'>Semester/Year</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your semester/year" {...field} className="bg-white rounded-[5px]"  />
                    </FormControl>
                    <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["semesterYear"]? " opacity-0" :"" )} >
                      {errors["semesterYear"]?.message?.toString() || " "}
                    </FormMessage>
                      </FormItem>
                    )}
              />
            </div>
          )}

          {(educationLevel === EEducationLevel.School || educationLevel === EEducationLevel.College) && (
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-custom-green">Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="bg-white text-black">
                          <SelectValue placeholder="Select your class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        {educationLevel === EEducationLevel.School
                          ? Object.values(ESchoolClass).map((grade) => (
                              <SelectItem key={grade} value={grade} className="focus:bg-grey-500 focus:text-black">
                                {grade}
                              </SelectItem>
                            ))
                          : educationLevel === EEducationLevel.College
                          ? Object.values(ECollegeClass).map((grade) => (
                              <SelectItem key={grade} value={grade} className="focus:bg-grey-500 focus:text-black">
                                {grade}
                              </SelectItem>
                            ))
                          : null}
                      </SelectContent>
                    </Select>
                    {errors["grade"] && (
                      <FormMessage className="text-red-500 mt-1">
                        {errors["grade"]?.message?.toString()}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
          )}
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

export default StudentForm
