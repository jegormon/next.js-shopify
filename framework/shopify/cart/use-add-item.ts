import { useAddItem } from "@/framework/common/cart";
import { MutationHook } from "@/framework/common/types/hooks";

export default useAddItem;

export const handler: MutationHook = {
  fetcher: (input: any) => {
    return JSON.stringify(input) + "_MODIFIED";
  },

  useHook: ({ fetch }) => {
    return (input: any) => {
      const res = fetch(input);
      return {
        output: res,
      };
    };
  },
};
