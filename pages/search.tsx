import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { Htag, Button, P, Tag, Rating } from '../components/indexs';
import { useEffect, useState } from 'react';
import {  withLayout } from '../layout/layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interfaces';
import { stringify } from 'querystring';
import { GetStaticProps } from 'next';

function Search({menu}:HomeProps): JSX.Element {
 
  const [reting, setRaring] = useState<number>(4);

  return (
    <>
     Search
    </>
  )
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async ()=>{
      const firstCategory = 0;
      const {data:menu}=await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',{firstCategory});
      return{
        props:{
          menu, 
          firstCategory
        }
      }
};

interface HomeProps extends Record<string, unknown>  {
  menu: MenuItem[];
  firstCategory: number;
}