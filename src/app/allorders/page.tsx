"use client";
import getAllOrders from "@/api/allOrders.api";
import { OrderType } from "@/types/order.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function AllOrders() {
  const { data: session, status } = useSession();
  const [allOrdersLoading, setAllOrdersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    async function fetchAllOrders() {
      try {
        if (!session) return;
        const fetchedOrders = await getAllOrders(session.id);
        setOrders(fetchedOrders);
      } catch  {
        setError("An error occurred while fetching your data.");
      } finally {
        setAllOrdersLoading(false);
      }
    }
    fetchAllOrders();
  }, [status, session]);

  if (status === "loading" || allOrdersLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <h1 className="text-center text-3xl font-bold my-12 min-h-screen">
        {error}
      </h1>
    );
  }

  if (orders.length === 0 && !allOrdersLoading) {
    return (
      <h1 className="text-center text-3xl font-bold my-12 min-h-screen">
        You haven&apos;t made any orders yet...
      </h1>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* ✅ TABLE VIEW (Visible on md and larger) */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Delivered</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-700">
                  {order.id}
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold">{order.user.name}</div>
                  <div className="text-gray-500 text-xs">
                    {order.user.email}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {order.user.phone}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    {order.cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-8 h-8 object-cover rounded"
                          width={500}
                          height={500}
                        />
                        <span>
                          {item.product.title} x {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800">
                  ${order.totalOrderPrice}
                </td>
                <td className="px-4 py-3 capitalize">
                  {order.paymentMethodType}
                </td>
                <td className="px-4 py-3">
                  {order.isPaid ? (
                    <span className="px-2 py-1 text-green-700 bg-green-100 rounded-full text-xs">
                      Paid
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-red-700 bg-red-100 rounded-full text-xs">
                      Unpaid
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {order.isDelivered ? (
                    <span className="px-2 py-1 text-green-700 bg-green-100 rounded-full text-xs">
                      Delivered
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-yellow-700 bg-yellow-100 rounded-full text-xs">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ MOBILE CARDS (Visible on small screens) */}
      <div className="lg:hidden space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-xl shadow p-4 border border-gray-200 bg-white"
          >
            <div className="font-mono text-xs text-gray-500 mb-2">
              ID: {order.id}
            </div>
            <div className="font-semibold">{order.user.name}</div>
            <div className="text-gray-500 text-sm">{order.user.email}</div>
            <div className="text-gray-400 text-sm mb-2">{order.user.phone}</div>

            <div className="mb-2 text-sm">
              <span className="font-semibold">Items:</span>
              <div className="mt-1 space-y-1">
                {order.cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-8 h-8 object-cover rounded"
                      width={500}
                      height={500}
                    />
                    <span>
                      {item.product.title} x {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-md my-5">
              <div>
                <span className="font-semibold">Total:</span> $
                {order.totalOrderPrice}
              </div>
              <div className="capitalize">{order.paymentMethodType}</div>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span className="font-semibold">Payment Status:</span>
              <span
                className={`px-2 py-1 rounded-full ${
                  order.isPaid
                    ? "text-green-700 bg-green-100"
                    : "text-red-700 bg-red-100"
                }`}
              >
                {order.isPaid ? "Paid" : "Unpaid"}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="font-semibold">Delivery Status:</span>
              <span
                className={`px-2 py-1 rounded-full ${
                  order.isDelivered
                    ? "text-green-700 bg-green-100"
                    : "text-yellow-700 bg-yellow-100"
                }`}
              >
                {order.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>
            <div className="text-gray-500 text-xs mt-2">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
