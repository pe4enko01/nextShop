import React, { useContext } from "react";
import cn from 'classnames';
import {format} from 'date-fns'
import styles from './Menu.module.css';
//import { useContext } from "react";
import { AppContext } from "../../context/app.contex";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interfaces";
import { TopLevelCategory } from "../../interfaces/page.interface";
import Link from 'next/link';
import { useRouter } from "next/dist/client/router";
import { firstLevelMenu } from "../../helpers/helpers";


export const Menu= ():JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory:string)=>{
        setMenu && setMenu(menu.map(m=>{
            if (m._id.secondCategory == secondCategory){
                m.isopened = !m.isopened;
            }
            return m;
        }));
    }

    const buitlFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(m => (
                    
                    <div key={m.route}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: m.id == firstCategory
                                })}>
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>
                            </a>
                        </Link>
                        {m.id == firstCategory && buitlSrcondLevel(m)}
                    </div>
                ))}
            </>
        )
    }

    const buitlSrcondLevel = (menuItem: FirstLevelMenuItem) => {
        return(
            <div className={styles.secondBlock}>
                {menu.map(m => {
                    if(m.pages.map(p=>p.alias).includes(router.asPath.split('/')[2])){
                        m.isopened = true;
                    }
                    return(

                    <div key = {m._id.secondCategory}>
                        <div className={styles.secondLevel} onClick={()=> openSecondLevel(m._id.secondCategory)}>
                            {m._id.secondCategory}
                        </div>
                            <div className={cn(styles.secondLevelBlock,{
                                [styles.secondLevelBlockOpened]: m.isopened
                            })}>
                                {buitlThirdLevel(m.pages, menuItem.route)}
                            </div>
                        </div>
                    
                    )
                    })}
            </div>
        )
    }

    const buitlThirdLevel = (pages: PageItem[], route: string) => {
        return(
            pages.map(p => {
                <Link href = {`/${route}/${p.alias}`}>
                <a className={cn(styles.thirdLevel,{
                    [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                })}>
                    {p.category}
                </a>
                </Link>
            })
            )
    }
   return(
       <div className={styles.menu}>
            {buitlFirstLevel()}
       </div>
   )
}

