"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  forgotPasswordSchema,
  forgotPasswordSchemaType,
} from "../schema/forgotPassword.schema";
import forgotPasswordResetCode from "@/api/forgotPassword.api";



export default function ForgotPassword() {
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  const emailForm = useForm<forgotPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function sendResetCode(values: forgotPasswordSchemaType) {
    setisLoading(true);
    const emailRes = await forgotPasswordResetCode(values);

    if (emailRes.statusMsg === "success") {
      toast.success(emailRes.message, { position: "top-center" });
      emailForm.reset();
      setisLoading(false);
      router.push("/forgotpassword/resetcode")
    } else {
      toast.error(emailRes.message || "An unexpected error has occurred", {
        position: "top-center",
      });
      setisLoading(false);
    }
  }

  return (
    <>
      <div className="w-[90%] md:w-1/2 mx-auto my-30 min-h-screen">
        <h1 className="text-3xl text-center font-bold my-4">Forgot Password</h1>
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(sendResetCode)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="disabled:cursor-default mt-4 cursor-pointer w-full"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <span>Send Reset code</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
