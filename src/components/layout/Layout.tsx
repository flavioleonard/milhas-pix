import type { ReactNode } from "react";
import { Header } from "../header/Header";
import "./Layout.css";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout-container">
            <Header />
            <main className="main-container">{children}</main>
        </div>
    );
};