import "@assets/main.css";
import { UIProvider } from "@/components/ui/context";
import { AppProps } from "next/app";
import { FC } from "react";

type NoopProps = {
  children: React.ReactNode;
};

const Noop: FC<NoopProps> = ({ children }) => <div>{children}</div>;

type AppPropsWithLayout = AppProps & {
  Component: {
    Layout?: FC;
  };
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? Noop;

  return (
    <UIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIProvider>
  );
}

export default MyApp;
