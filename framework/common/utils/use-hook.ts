import { useApiProvider } from "@common";
import { ApiHooks } from "../types/api";
import { MutationHook } from "../types/hooks";

export const useHook = (fn: (apiHooks: ApiHooks) => MutationHook) => {
  const { hooks } = useApiProvider();
  return fn(hooks);
};
