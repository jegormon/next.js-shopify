import { AppProps } from "next/app";
import { FC } from "react";
import "@assets/main.css";

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
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
