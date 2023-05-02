import { ReactNode } from "react";
import { getConfig } from "./api/config";
import { shopifyHooks } from "./hooks";

import {
  ApiProvider as CoreApiProvider,
  useApiProvider as useCoreApiProvider,
} from "@common";

interface ShopifyApiProviderProps {
  children: ReactNode | ReactNode;
}

const config = getConfig();

export const ApiProvider = ({ children }: ShopifyApiProviderProps) => {
  return (
    <CoreApiProvider config={{ ...config }} hooks={shopifyHooks}>
      {children}
    </CoreApiProvider>
  );
};

export const useApiProvider = () => useCoreApiProvider();
