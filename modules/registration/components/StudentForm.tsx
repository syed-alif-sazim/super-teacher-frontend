import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from "@/shared/components/shadui";
import {
  EGender,
  EDegree,
  EEducationLevel,
  EMedium,
  ECollegeClass,
  ESchoolClass,
} from "@/shared/typedefs";
import CustomSelectInput from "@/shared/components/Form/CustomSelectInput";
import { PasswordInput } from "@/shared/components/Form/PasswordInput";
import { StudentFormSchema } from "./StudentForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSubmitStudentForm from "../hooks/useSubmitStudentForm";
import { TStudentForm } from "./StudentForm.types";

const StudentForm = () => {
  const form = useForm<TStudentForm>({
    resolver: zodResolver(StudentFormSchema),
    mode: "onChange",
  });
  const {
    watch,
    formState: { errors },
    handleSubmit,
  } = form;
  const educationLevel = watch("educationLevel");

  const { submitStudentForm } = useSubmitStudentForm();

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
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} className="bg-white" />
                  </FormControl>
                  {errors["firstName"] && (
                    <FormMessage className="text-red-500 mt-1">
                      {errors["firstName"]?.message?.toString()}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} className="bg-white" />
                  </FormControl>
                  {errors["lastName"] && (
                    <FormMessage className="text-red-500 mt-1">
                      {errors["lastName"]?.message?.toString()}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <CustomSelectInput
                      placeholder="Select your gender"
                      value={field.value}
                      onChange={field.onChange}
                      options={Object.values(EGender).map((gender) => ({
                        label: gender,
                        value: gender,
                      }))}
                      isError={false}
                      buttonClassname="bg-white text-black"
                      dropdownClassname="bg-white text-black"
                    />
                  </FormControl>
                  {errors["gender"] && (
                    <FormMessage className="text-red-500 mt-1">
                      {errors["gender"]?.message?.toString()}
                    </FormMessage>
                  )}
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} className="bg-white" />
                  </FormControl>
                  {errors["address"] && (
                    <FormMessage className="text-red-500 mt-1">
                      {errors["address"]?.message?.toString()}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} className="bg-white" />
                  </FormControl>
                  {errors["phoneNumber"] && (
                    <FormMessage className="text-red-500 mt-1">
                      {errors["phoneNumber"]?.message?.toString()}
                    </FormMessage>
                  )}
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
                  <FormLabel>Education Level</FormLabel>
                  <FormControl>
                    <CustomSelectInput
                      placeholder="Select your education level"
                      value={field.value}
                      onChange={field.onChange}
                      options={Object.values(EEducationLevel).map((level) => ({
                        label: level,
                        value: level,
                      }))}
                      isError={false}
                      buttonClassname="bg-white text-black"
                      dropdownClassname="bg-white text-black"
                    />
                  </FormControl>
                  {errors["educationLevel"] && (
                    <FormMessage className="text-red-500 mt-1">
                      {errors["educationLevel"]?.message?.toString()}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {educationLevel && (
              <>
                {educationLevel === EEducationLevel.School ||
                educationLevel === EEducationLevel.College ? (
                  <FormField
                    control={form.control}
                    name="medium"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Medium</FormLabel>
                        <FormControl>
                          <CustomSelectInput
                            placeholder="Select your medium"
                            value={field.value}
                            onChange={field.onChange}
                            options={Object.values(EMedium).map((medium) => ({
                              label: medium,
                              value: medium,
                            }))}
                            isError={false}
                            buttonClassname="bg-white text-black"
                            dropdownClassname="bg-white text-black"
                          />
                        </FormControl>
                        {errors["medium"] && (
                          <FormMessage className="text-red-500 mt-1">
                            {errors["medium"]?.message?.toString()}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                ) : educationLevel === EEducationLevel.University ? (
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Bachelor/Master</FormLabel>
                        <FormControl>
                          <CustomSelectInput
                            placeholder="Select your degree"
                            value={field.value}
                            onChange={field.onChange}
                            options={Object.values(EDegree).map((degree) => ({
                              label: degree,
                              value: degree,
                            }))}
                            isError={false}
                            buttonClassname="bg-white text-black"
                            dropdownClassname="bg-white text-black"
                          />
                        </FormControl>
                        {errors["degree"] && (
                          <FormMessage className="text-red-500 mt-1">
                            {errors["degree"]?.message?.toString()}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                ) : null}
              </>
            )}
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
            {educationLevel === EEducationLevel.University && (
              <>
                <FormField
                  control={form.control}
                  name="degreeName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Degree Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your degree name"
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      {errors["degreeName"] && (
                        <FormMessage className="text-red-500 mt-1">
                          {errors["degreeName"]?.message?.toString()}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="semesterYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Semester/Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your semester/year"
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      {errors["semesterYear"] && (
                        <FormMessage className="text-red-500 mt-1">
                          {errors["semesterYear"]?.message?.toString()}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </>
            )}

            {(educationLevel === EEducationLevel.School ||
              educationLevel === EEducationLevel.College) && (
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <CustomSelectInput
                        placeholder="Select your class"
                        value={field.value}
                        onChange={field.onChange}
                        options={
                          educationLevel === EEducationLevel.School
                            ? Object.values(ESchoolClass).map((grade) => ({
                                label: grade,
                                value: grade,
                              }))
                            : educationLevel === EEducationLevel.College
                              ? Object.values(ECollegeClass).map((grade) => ({
                                  label: grade,
                                  value: grade,
                                }))
                              : []
                        }
                        isError={false}
                        buttonClassname="bg-white text-black"
                        dropdownClassname="bg-white text-black"
                      />
                    </FormControl>
                    {errors["medium"] && (
                      <FormMessage className="text-red-500 mt-1">
                        {errors["medium"]?.message?.toString()}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} className="bg-white" />
                  </FormControl>
                  {errors["email"] && (
                    <FormMessage className="text-red-500 mt-1">
                      {errors["email"]?.message?.toString()}
                    </FormMessage>
                  )}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      {...field}
                      className="bg-white"
                      isError={false}
                    />
                  </FormControl>
                  {errors["password"] && (
                    <FormMessage className="text-red-500 mt-1">
                      {errors["password"]?.message?.toString()}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirm your password"
                      {...field}
                      className="bg-white"
                      isError={false}
                    />
                  </FormControl>
                  {errors["confirmPassword"] && (
                    <FormMessage className="text-red-500 mt-1">
                      {errors["confirmPassword"]?.message?.toString()}
                    </FormMessage>
                  )}
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
  );
};

export default StudentForm;
