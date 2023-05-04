import useCart, { UseCart } from "@common/cart/use-cart";
import { checkoutToCart, createCheckout, getCheckoutQuery } from "../utils";
import { useMemo } from "react";
import { Cart } from "@/framework/common/types/cart";
import { SWRHook } from "@/framework/common/types/hooks";
import { Checkout } from "../schema";

export default useCart as UseCart<typeof handler>;

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string;
  };
  fetcherOutput: {
    node: Checkout;
  };
  data: Cart;
};

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ fetch, options, input: { checkoutId } }) {
    let checkout: Checkout;

    if (checkoutId) {
      const { data } = await fetch({
        ...options,
        variables: {
          checkoutId,
        },
      });
      checkout = data.node;
    } else {
      checkout = await createCheckout(fetch as any);
    }

    const cart = checkoutToCart(checkout);
    return cart;
  },

  // TODO: Fix this issue
  useHook:
    ({ useData }) =>
    () => {
      const response = useData({
        swrOptions: {
          revalidateOnFocus: false,
        },
      });

      return useMemo(() => {
        return {
          ...response,
          isEmpty: (response.data?.lineItems.length ?? 0) <= 0,
        };
      }, [response]);
    },
};
