import Cookies from "js-cookie";
import { ApiHooks } from "../types/hooks";
import { useHook, useSWRHook } from "../utils/use-hook";
import { useApiProvider } from "..";

const useCart = () => {
  const hook = useHook((hooks: ApiHooks) => hooks.cart.useCart);
  const { checkoutCookie } = useApiProvider();

  const fetcherWrapper: typeof hook.fetcher = (context) => {
    context.input.checkoutId = Cookies.get(checkoutCookie);

    return hook.fetcher(context);
  };

  return useSWRHook({ ...hook, fetcher: fetcherWrapper });
};

export default useCart;
