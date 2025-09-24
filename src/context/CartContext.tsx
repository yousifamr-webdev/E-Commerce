"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import getLoggedUserCart from "@/CartActions/getUserCart.action";
import { useSession } from "next-auth/react";

// ✅ 1. Define the context value type
type CartContextType = {
  numberOfCartItem: number;
  setnumberOfCartItem: React.Dispatch<React.SetStateAction<number>>;
};

// ✅ 2. Create the context with correct type
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// ✅ 3. Define the provider props
type CartContextProviderProps = {
  children: ReactNode;
};

// ✅ 4. Provider Component
export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numberOfCartItem, setnumberOfCartItem] = useState<number>(0);
  const { status } = useSession();
  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        // Sum all product counts in the cart
        const sum = res.data.products.reduce(
          (acc: number, product: { count: number }) => acc + product.count,
          0
        );
        setnumberOfCartItem(sum);
      }
    } catch (err) {
      console.error("Failed to fetch user cart:", err);
    }
  }

  
  useEffect(() => {
    // ✅ Only fetch if the session is authenticated
    if (status === "authenticated") {
      getUserCart();
    } else if (status === "unauthenticated") {
      // Clear cart count if user logs out
      setnumberOfCartItem(0);
    }
  }, [status]);

  return (
    <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

// ✅ 5. Optional Custom Hook for safer usage
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside CartContextProvider");
  }
  return context;
}

// "use client";
// import getLoggedUserCart from "@/CartActions/getUserCart.action";
// import { createContext, useEffect, useState } from "react";

// export const CartContext = createContext();

// export default function CartContextProvider({ children }) {
//   const [numberOfCartItem, setnumberOfCartItem] = useState(0);

//   async function getUserCart() {
//     try {
//       let res = await getLoggedUserCart();
//       if (res.status === "success") {
//         let sum = 0;
//         res.data.products.forEach((product) => {
//           sum += product.count;
//         });
//         setnumberOfCartItem(sum);
//       }
//     } catch (err) {}
//   }

//   useEffect(() => {
//     getUserCart();
//   }, []);

//   return (
//     <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
//       {children}
//     </CartContext.Provider>
//   );
// }
