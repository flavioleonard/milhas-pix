import type { ReactNode } from "react";
import { Header } from "../header/Header";
import styles from "./Layout.module.css";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles['layout-container']}>
            <Header />
            <main className={styles['main-container']}>{children}</main>
        </div>
    );
};