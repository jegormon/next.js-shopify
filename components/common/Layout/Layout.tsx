import { FC } from "react";
import s from "./Layout.module.css";
import { Navbar, Footer } from "@components/common";
import { Sidebar } from "@/components/ui";
import { CartSidebar } from "@/components/cart";
import { useUI } from "@/components/ui/context";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
	const { isSidebarOpen, closeSidebar } = useUI();

	return (
		<div className={s.root}>
			<Navbar />
			<Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
				<CartSidebar />
			</Sidebar>
			<main className="fit">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
