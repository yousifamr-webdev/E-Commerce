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

import { signIn } from "next-auth/react";
import Link from "next/link";
import { loginSchema, loginSchemaType } from "../schema/login.schema";

export default function Login() {
const [loginLoading, setloginLoading] = useState(false)


  

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginSchemaType) {
    setloginLoading(true)
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.ok) {
      toast.success("Login was successful", {
        position: "top-center",
      });
      window.location.href = "/";
      setloginLoading(false)
    } else {
      toast.error(response?.error, { position: "top-center" });
        setloginLoading(false);
    }
  }

  return (
    <>
      <div className="w-[90%] md:w-1/2 mx-auto my-30 min-h-screen">
        <h1 className="text-3xl text-center font-bold my-4">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-3"
          >
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

            <Button
              disabled={loginLoading}
              className="disabled:cursor-default mt-4 cursor-pointer w-full"
              type="submit"
            >
              {loginLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <span>Sign in</span>
              )}
            </Button>
            <div className="flex gap-2 justify-center items-center">
              <p className="text-center text-gray-500">
                Don&apos;t have an account?
              </p>
              <Link
                href="/register"
                className="hover:underline text-blue-500 font-semibold"
              >
                Register
              </Link>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Link
                href="/forgotpassword"
                className="hover:underline text-center text-gray-500"
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
