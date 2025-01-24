import React from "react";
import { useState } from 'react'
import { PasswordInput } from "@/shared/components/Form/PasswordInput";
import { Button } from "@/shared/components/shadui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadui/form";
import { Input } from "@/shared/components/shadui/input";

import { useLoginForm } from "./LoginForm.hooks";
import { cn } from "@/lib/utils";
import RoleDialog from "@/shared/components/RoleDialog";
import ForgetPasswordDialog from "@/modules/forget-password/containers/ForgetPasswordDialog";

const LoginForm = () => {
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [isForgetDialogOpen, setIsForgetDialogOpen] = useState(false)
  const [forgetPasswordStage, setforgetPasswordStage] = useState(1);
  const { form, onSubmit } = useLoginForm();
  const { formState: { errors } } = form

  const handleRegisterClick = () => {
    setIsRoleDialogOpen(true) 
  }
  const handleForgetPasswordClick = () => {
    setIsForgetDialogOpen(true) 
  }
  const handleForgetPasswordClose = async () => {
    setIsForgetDialogOpen(false);
    setTimeout(() => {
      setforgetPasswordStage(1); 
    }, 300);
  };

  return (
    <div className='w-[300px] sm:w-[400px]'>
      <h1 className='text-center text-2xl font-bold mb-3'>LOGIN</h1>
      <Form {...form} >
        <form onSubmit={onSubmit}>
          <div className='mb-3'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-custom-green'>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} className="bg-white rounded-[5px]" />
                  </FormControl>
                  <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["email"]? " opacity-0" :"" )} >
                    {errors["email"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-custom-green'>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} className="bg-white rounded-[5px]" />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-1",!errors["password"]? " opacity-0" :"" )} >
                    {errors["password"]?.message?.toString() || " "}
                  </FormMessage>
              </FormItem>
            )}
          />

          <div className='text-sm flex flex-col items-center mt-7'>
            <Button type="submit" variant="ghost" className="bg-custom-green text-white hover:bg-green-700 rounded-[5px]">
              Submit
            </Button>
            <p onClick={handleForgetPasswordClick}className='hover:underline cursor-pointer mt-5'>
              Forget Password
            </p>
            <p className="mt-3 flex items-center space-x-2">
              <span>Don't have an account?</span>
              <p onClick={handleRegisterClick} className="text-white hover:underline cursor-pointer">
                Get back and register
              </p>
            </p>
          </div>
        </form>
      </Form>
      <RoleDialog isDialogOpen={isRoleDialogOpen} onClose={() => setIsRoleDialogOpen(false)} />
      <ForgetPasswordDialog isDialogOpen={isForgetDialogOpen} stage={forgetPasswordStage} setStage={setforgetPasswordStage} onClose={handleForgetPasswordClose} />
    </div>
  );
};

export default LoginForm;
