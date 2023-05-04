import useRemoveItem, {
  UseRemoveItem,
} from "@/framework/common/cart/use-remove-item";
import { CheckoutLineItemsRemovePayload } from "../schema";
import { Cart } from "@/framework/common/types/cart";
import { MutationHook } from "@/framework/common/types/hooks";
import { checkoutToCart, getCheckoutId } from "../utils";
import { checkoutLineItemRemoveMutation } from "../utils/mutations";
import useCart from "./use-cart";

export default useRemoveItem as UseRemoveItem<typeof handler>;

export type RemoveItemDescriptor = {
  fetcherInput: {
    id: string;
  };
  fetcherOutput: {
    checkoutLineItemsRemove: CheckoutLineItemsRemovePayload;
  };
  data: Cart;
};

export const handler: MutationHook<RemoveItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemRemoveMutation,
  },

  async fetcher({ input: { id }, options, fetch }) {
    const { data } = await fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItemIds: [id],
      },
    });

    const cart = checkoutToCart(data.checkoutLineItemsRemove.checkout);
    return cart;
  },

  useHook:
    ({ fetch }) =>
    () => {
      const { mutate: updateCart } = useCart();
      return async (input) => {
        debugger;
        const data = await fetch(input);
        await updateCart(data, false);
        debugger;
        return data;
      };
    },
};
