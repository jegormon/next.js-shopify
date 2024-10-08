import { useHook, useMutationHook } from "@common/utils/use-hook";
import { MutationHook } from "../types/hooks";

export type UseRemoveItem<H extends MutationHook = MutationHook<any>> =
  ReturnType<H["useHook"]>;

const useRemoveItem: UseRemoveItem = () => {
  const hook = useHook((hooks) => {
    return hooks.cart.useRemoveItem;
  });

  return useMutationHook({ ...hook })();
};

export default useRemoveItem;
