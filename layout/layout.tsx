import React, { FunctionComponent } from "react";
import { LayoutProps } from "./layout.props";
import cn from 'classnames';
import styles from './layout.module.css';
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { AppContextProvider } from "../context/app.contex";
import { IAppContext } from "../context/app.contex";

export const Layout= ({children}:LayoutProps):JSX.Element => {
   return(
       <div className={styles.wrapper}>
        <Header className={styles.header}/>
        <Sidebar className={styles.sidebar}/>
        <div className={styles.body}>
            {children}
        </div>
        <Footer className={styles.footer}/>
       </div>
   );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext> (Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element{
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
             <Layout>
                    <Component {...props}/>
             </Layout>
            </AppContextProvider>
        );
    };
};