"use client";
import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/back-button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { LoginAction } from "@/actions/login";
import { toast } from "sonner";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      LoginAction(values).then((data) => {
        if (data?.success) {
          toast.success(data?.success);
        }
        if (data?.error) {
          toast.error(data?.error);
        }
        // setError(data?.error);
        // setSuccess(data?.success);
      });
    });
  };
  return (
    <div className=" bg-gradient-to-br from-white via-white to-[#828282]  h-screen pt-8  ">
      <div className="max-w-6xl mx-auto">
        <div className=" flex flex-col items-center justify-center pt-7">
          {/* Heading */}
          <div className=" ">
            <h1 className=" text-xl sm:text-[40px]  font-semibold text-[#828282]">
              Login
            </h1>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-10 w-full mt-12"
            >
              <div className="space-y-8 max-w-xl mx-auto">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-[#828282]">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John.Doe@example.com"
                          type="email"
                          className=" w-full text-gray-800 bg-gray-200 rounded-[10px] p-2 border-2 hover:border-gray-800 transition-all duration-700 h-[40px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-[#828282]">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="*******"
                          type="password"
                          className=" w-full text-gray-800 bg-gray-200 rounded-[10px] p-2 border-2 hover:border-gray-800 transition-all duration-700 h-[40px]"
                        />
                      </FormControl>
                      {/* <div className=" flex flex-row items-center justify-between">
                        <Button
                          size={"sm"}
                          variant={"link"}
                          asChild
                          className=" px-0 font-normal text-[#D18F52] hover:text-indigo-500"
                        >
                          <Link href={"/auth/reset"}>
                            ¿Has olvidado tu contraseña?
                          </Link>
                        </Button>
                      </div> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button or other actions */}
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  disabled={isPending}
                  className=" w-[25%] h-[40px] mx-auto flex  justify-center rounded-[10px] bg-[#0E9F6E]  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#0E9F6E] focus-visible:outline focus-visible:outline-2 border-2  focus-visible:outline-offset-2  border-emerald-600 hover:border-gray-800 transition-all duration-500  "
                >
                  Login
                </Button>
              </div>
            </form>
            <div className=" my-3">
              <BackButton label="Dont't have an account?" href="/register" />
            </div>
          </Form>

          {/* Form */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
