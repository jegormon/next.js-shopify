import { useAddItem } from "@/framework/common/cart";
import { MutationHook } from "@/framework/common/types/hooks";
import { getCheckoutId } from "@framework/utils";
import { checkoutLineItemsAddMutation } from "../utils/mutations";

export default useAddItem;

export const handler: MutationHook = {
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

    const res = await fetch({
      ...options,
      variables: variables,
    });

    return res;
  },

  useHook: ({ fetch }) => {
    return async (input: any) => {
      const res = await fetch(input);
      return {
        output: res,
      };
    };
  },
};
