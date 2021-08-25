import React from "react";
import { SidebarProps } from "./Sidebar.props";
import cn from 'classnames';
import { Menu } from "../Menu/Menu";
import styles from './Sidebar.module.css';

export const Sidebar= ({...props}:SidebarProps):JSX.Element => {
   return(
       <div {...props}>
           <Menu/>
       </div>
   )
}