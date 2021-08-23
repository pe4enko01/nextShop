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
import { TopPageModel } from '../../interfaces/page.interface';

const firstCategory = 0;

function Course({menu, page}:CourseProps): JSX.Element {

  return (
    <>
     {page._id}
    </>
  )
}

export default withLayout(Course);
export const getStaticPaths: GetStaticPaths = async ()=>{
    const {data:menu}=await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',{firstCategory});
    return {
        paths: menu.flatMap(m=>m.pages.map(p=>'/courses/' + p.alias)),
        fallback: true
    }
}


export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>)=>{
    if(!params){
        return{
            notFound: true
        }
    }

    
      const {data:menu}=await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',{firstCategory});

      const {data:page}=await axios.get<TopPageModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);

      return{
        props:{
          menu, 
          firstCategory,
          page
        }
      }
};

interface CourseProps extends Record<string, unknown>  {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
}