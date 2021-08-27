import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Htag, Button, P, Tag, Rating } from '../components/indexs';
import { useEffect, useState } from 'react';
import {  withLayout } from '../../layout/layout';
import axios from 'axios';
import { ParsedUrlQuery, stringify } from 'querystring';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import { MenuItem } from '../../interfaces/menu.interfaces';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { firstLevelMenu } from '../../helpers/helpers';



function Course({menu, page}:CourseProps): JSX.Element {

  return (
    <>
     {page._id}
    </>
  )
}

export default withLayout(Course);
export const getStaticPaths: GetStaticPaths = async ()=>{
    let paths:string[] = [];
    for(const m of firstLevelMenu){
      const {data:menu}=await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',{firstCategory: m.id});
      paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
    }
    return {
        paths,
        fallback: true
    }
}




export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>)=>{
    if(!params){
        return{
            notFound: true
        }
    }


     const firstCategoryItem = firstLevelMenu.find(m =>m.route == params.type);
     if(!firstCategoryItem){
      return{
          notFound: true
      }
    }

      try{

        const {data:menu}=await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',{firstCategory: firstCategoryItem.id});
        if(menu.length == 0){
          return{
            notFound: true
          }
        };
        const {data:page}=await axios.get<TopPageModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
        return{
          props:{
            menu, 
            firstCategory:firstCategoryItem.id,
            page
          }
        }
      } catch{
        return{
          notFound: true
      }
      }

};

interface CourseProps extends Record<string, unknown>  {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
}