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
import { registerSchema, registerSchemaType } from "../schema/register.schema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Link from "next/link";


export default function Register() {

  const [registerLoading, setregisterLoading] = useState(false)

const router = useRouter()


  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: registerSchemaType) {
    setregisterLoading(true)
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      if (res.data.message === "success") {
        toast.success("Your account was created successfully", { position: "top-center" })
        router.push('/login')
        setregisterLoading(false)
      }
    } catch (err: unknown) {
      setregisterLoading(false);
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.errors?.msg || "Something went wrong",
          { position: "top-center" }
        );
      } else {
        toast.error("Something went wrong", { position: "top-center" });
      }
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto h-screen my-12">
        <h1 className="text-3xl text-center font-bold my-4">Register</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter Password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={registerLoading}
              className="disabled:cursor-default mt-4 cursor-pointer w-full"
              type="submit"
            >
              {registerLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <span>Sign up</span>
              )}
            </Button>
            <div className="flex justify-center items-center gap-2">
              <p className="text-center text-gray-500">
                Already have an account?
              </p>
              <Link
                href="/login"
                className="hover:underline text-blue-500 font-semibold"
              >
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
