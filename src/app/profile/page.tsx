"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import {
  updateInfoSchema,
  updateInfoSchemaType,
} from "../schema/updateInfo.schema";
import getMyToken from "@/utilities/getMyToken";
import {
  updatePasswordSchema,
  updatePasswordSchemaType,
} from "../schema/updatePassword.schema";
import Link from "next/link";

export default function Profile() {
  const { data: session, update } = useSession();
  const [openUpdateInfo, setOpenUpdateInfo] = useState(false);
  const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
  const [submitLoading, setsubmitLoading] = useState(false);

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  const updateInfoForm = useForm<updateInfoSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(updateInfoSchema),
  });

  const updatePassowrdForm = useForm<updatePasswordSchemaType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  async function handleUpdateInfo(values: updateInfoSchemaType) {
    setsubmitLoading(true);
    const token = await getMyToken();
    if (!token) {
      throw new Error("Please login first!");
    }
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        values,
        {
          headers: {
            token: token,
          },
        }
      );
      if (res.data.message === "success") {
        toast.success("Your Info was updated successfully", {
          position: "top-center",
        });
        const freshUser = res.data.user;
        await update({ user: freshUser });
        updateInfoForm.reset();
        setOpenUpdateInfo(false);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.errors?.msg || "Something went wrong", {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", { position: "top-center" });
      }
    } finally {
      setsubmitLoading(false);
    }
  }

  async function handleUpdatePassword(values: updatePasswordSchemaType) {
    setsubmitLoading(true);
    const token = await getMyToken();
    if (!token) {
      throw new Error("Please login first!");
    }
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        values,
        {
          headers: {
            token: token,
          },
        }
      );
      if (res.data.message === "success") {
        toast.success("Your password was updated successfully", {
          position: "top-center",
        });
        logout();
        updatePassowrdForm.reset();
        setOpenUpdatePassword(false);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.errors?.msg || "Something went wrong", {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", { position: "top-center" });
      }
    } finally {
      setsubmitLoading(false);
    }
  }

  return (
    <>
      <div className="w-[80%] mx-auto my-12 h-screen">
        <Card>
          <CardHeader>
            <CardTitle>{session?.user.name}</CardTitle>
            <CardDescription>{session?.user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              
              <Link
                href="/allorders"
                className="w-full bg-gray-100 rounded-sm hover:bg-gray-300 cursor-pointer py-2 px-4"
              >
                Orders
              </Link>
              <Link
                href="/wishlist"
                className="w-full bg-gray-100 rounded-sm hover:bg-gray-300 cursor-pointer py-2 px-4"
              >
                Wishlist
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <Sheet
                open={openUpdatePassword}
                onOpenChange={setOpenUpdatePassword}
              >
                <SheetTrigger className="bg-primary rounded-md text-sm font-medium whitespace-nowrap hover:bg-primary/90 text-white  py-2 px-4 cursor-pointer">
                  Change password
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Change your password</SheetTitle>
                    <div className="w-full mx-auto my-8">
                      <Form {...updatePassowrdForm}>
                        <form
                          onSubmit={updatePassowrdForm.handleSubmit(
                            handleUpdatePassword
                          )}
                          className="flex flex-col gap-3"
                        >
                          <FormField
                            control={updatePassowrdForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password:</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter current password"
                                    type="password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={updatePassowrdForm.control}
                            name="password"
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
                          <FormField
                            control={updatePassowrdForm.control}
                            name="rePassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Re-enter Paswword:</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Re-enter new password"
                                    type="password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            disabled={submitLoading}
                            className="disabled:cursor-default mt-4 cursor-pointer w-full"
                          >
                            {submitLoading ? (
                              <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              <span>Submit</span>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              <Sheet open={openUpdateInfo} onOpenChange={setOpenUpdateInfo}>
                <SheetTrigger className="bg-primary rounded-md text-sm font-medium whitespace-nowrap hover:bg-primary/90 text-white  py-2 px-4 cursor-pointer">
                  Update your Info
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Update your Info</SheetTitle>
                    <div className="w-full mx-auto my-8">
                      <Form {...updateInfoForm}>
                        <form
                          onSubmit={updateInfoForm.handleSubmit(
                            handleUpdateInfo
                          )}
                          className="flex flex-col gap-3"
                        >
                          <FormField
                            control={updateInfoForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name:</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter current or new name"
                                    type="text"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={updateInfoForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Email:</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter new email"
                                    type="email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={updateInfoForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone:</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter current or new phone"
                                    type="tel"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            disabled={submitLoading}
                            className="disabled:cursor-default mt-4 cursor-pointer w-full"
                          >
                            {submitLoading ? (
                              <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              <span>Submit</span>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
