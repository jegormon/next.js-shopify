import { useHook, useMutationHook } from "@common/utils/use-hook";
import { MutationHook } from "../types/hooks";

export type UseUpdateItem<H extends MutationHook = MutationHook<any>> =
  ReturnType<H["useHook"]>;

const useUpdateItem = () => {
  const hook = useHook((hooks) => {
    return hooks.cart.useUpdateItem;
  });

  return useMutationHook({ ...hook })();
};

export default useUpdateItem;
