import { useAddItem } from "@/framework/common/cart";
import { MutationHook } from "@/framework/common/types/hooks";
import { checkoutToCart, getCheckoutId } from "@framework/utils";
import { checkoutLineItemsAddMutation } from "../utils/mutations";
import { Cart } from "@/framework/common/types/cart";
import { CheckoutLineItemsAddPayload } from "../schema";
import { UseAddItem } from "@/framework/common/cart/use-add-item";

export default useAddItem as UseAddItem<typeof handler>;

export type AddItemHookDescriptor = {
  fetcherInput: {
    variant: string;
    quantity: number;
  };
  fetcherOutput: {
    checkoutLineItemsAdd: CheckoutLineItemsAddPayload;
  };
  data: Cart;
};

export const handler: MutationHook<AddItemHookDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemsAddMutation,
  },
  fetcher: async ({ fetch, options, input }) => {
    const variables = {
      checkoutId: getCheckoutId(),
      lineItems: [
        {
          variantId: input.variant,
          quantity: 1,
        },
      ],
    };

    const { data } = await fetch({
      ...options,
      variables: variables,
    });

    debugger;
    const cart = checkoutToCart(data.checkoutLineItemsAdd.checkout);

    debugger;
    return cart;
  },

  useHook:
    ({ fetch }) =>
    () => {
      return async (input) => {
        const response = await fetch(input);
        return response;
      };
    },
};
