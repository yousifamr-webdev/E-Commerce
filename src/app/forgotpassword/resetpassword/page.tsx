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
  resetPasswordSchema,
  resetPasswordSchemaType,
} from "../../schema/resetPassword.schema";
import setNewPassword from "@/api/resetPassword.api";

export default function ResetPassword() {
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  const resetCodeForm = useForm<resetPasswordSchemaType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function handleVerifyResetCode(values: resetPasswordSchemaType) {
    setisLoading(true);
    const codeRes = await setNewPassword(values);

    if (codeRes.token) {
      toast.success("Your password was updated successfully", {
        position: "top-center",
      });
      resetCodeForm.reset();
      setisLoading(false);
      router.push("/login");
    } else {
      toast.error("An unexpected error has occurred", {
        position: "top-center",
      });
      setisLoading(false);
    }
  }

  return (
    <>
      <div className="w-[90%] md:w-1/2 mx-auto my-40 min-h-screen">
        <Form {...resetCodeForm}>
          <form
            onSubmit={resetCodeForm.handleSubmit(handleVerifyResetCode)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={resetCodeForm.control}
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
            <FormField
              control={resetCodeForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter new password"
                      type="password"
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
                <span>Submit</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
