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
import { useParams } from "next/navigation";

import {
  checkoutSchema,
  checkoutSchemaType,
} from "../../../schema/checkout.schema";
import onlinePayment from "@/checkoutActions/onlineCheckout.action";

export default function OnlinePayment() {
  const [submitLoading, setsubmitLoading] = useState(false);

  const { id }: { id: string } = useParams();

 

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleCheckout(values: checkoutSchemaType) {
    setsubmitLoading(true);
    const res = await onlinePayment(id, "", values);
    if (res.status === "success") {
      toast.loading("Redirecting...", {
        position: "top-center",
      });
      window.location.href = res.session.url;
      setsubmitLoading(false);
    } else {
      toast.error(res.error || "An unexpected error has occured!", {
        position: "top-center",
      });
      setsubmitLoading(false);
    }
  }

  return (
    <>
      <div className="w-[90%] md:w-1/2 mx-auto min-h-screen my-20">
        <h1 className="text-3xl text-center font-bold my-4">Checkout</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCheckout)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Details:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your shipping address"
                      type="text"
                      {...field}
                    />
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
                    <Input
                      placeholder="Enter your phone"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your city"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={submitLoading}
              className="mt-4 cursor-pointer w-full disabled:cursor-default"
            >
              {submitLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <span>Pay Now</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
