import { FC } from "react";

import s from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={s.root}>
      <main className="fit">{children}</main>
    </div>
  );
};

export default Layout;
