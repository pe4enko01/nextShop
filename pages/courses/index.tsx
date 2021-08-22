import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

//import { Htag, Button, P, Tag, Rating } from '../components/indexs';
import { useEffect, useState } from 'react';
import {  withLayout } from '../../layout/layout';
import axios from 'axios';
//import { MenuItem } from '../interfaces/menu.interfaces';
import { stringify } from 'querystring';
import { GetStaticProps } from 'next';
import { MenuItem } from '../../interfaces/menu.interfaces';

function Course({menu}:CourseProps): JSX.Element {

  return (
    <>
     
    </>
  )
}

export default withLayout(Course);

export const getStaticProps: GetStaticProps<CourseProps> = async ()=>{
      const firstCategory = 0;
      const {data:menu}=await axios.post<CourseProps[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',{firstCategory});

      const {data:page}=await axios.post<CourseProps[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',{firstCategory});

      return{
        props:{
          menu, 
          firstCategory
        }
      }
};

interface CourseProps extends Record<string, unknown>  {
  menu: MenuItem[];
  firstCategory: number;
}