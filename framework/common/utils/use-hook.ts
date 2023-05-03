import { useApiProvider } from "@common";
import { ApiHooks, MutationHook } from "@common/types/hooks";
import { ApiFetcher } from "../types/api";
import useSWR from "swr";

export const useHook = (fn: (apiHooks: ApiHooks) => MutationHook) => {
  const { hooks } = useApiProvider();
  return fn(hooks);
};

export const useMutationHook = (hook: MutationHook) => {
  const { fetcher } = useApiProvider();
  return hook.useHook({
    fetch: (input: any) => {
      return hook.fetcher({
        input,
        fetch: fetcher,
        options: hook.fetcherOptions,
      });
    },
  });
};

const useData = (hook: any, fetcher: ApiFetcher, ctx: any) => {
  const hookFetcher = async (query: string) => {
    try {
      return await hook.fetcher({
        fetch: fetcher,
        options: { query },
        input: {},
      });
    } catch (error) {
      throw error;
    }
  };

  const res = useSWR(hook.fetchOptions.query, hookFetcher, ctx.swrOptions);
  return res;
};

//** cache data first if possible. SWR - stale-while-revalidate */
export const useSWRHook = (hook: any) => {
  const { fetcher } = useApiProvider();

  return hook.useHook({
    useData(ctx: any) {
      const data = useData(hook, fetcher, ctx);
      return data;
    },
  });
};
