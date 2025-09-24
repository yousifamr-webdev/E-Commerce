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
  resetCodeSchema,
  resetCodeSchemaType,
} from "../../schema/resetCode.schema";


export default function ResetCode() {
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  const resetCodeForm = useForm<resetCodeSchemaType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(resetCodeSchema),
  });

  
async function handleVerifyResetCode(values: resetCodeSchemaType) {
  setisLoading(true);

  try {
    const res = await fetch("/api/verifyResetCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.status === "Success") {
      toast.success("Reset code is valid", { position: "top-center" });
      resetCodeForm.reset();
      // Redirect to reset password page
      router.push("/forgotpassword/resetpassword");
    } else {
      toast.error(data.message || "Invalid reset code", {
        position: "top-center",
      });
    }
  } catch  {
    toast.error("An unexpected error occurred", { position: "top-center" });
  }

  setisLoading(false);
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
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset code:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter reset code"
                      type="text"
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
                <span>Verify code</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
