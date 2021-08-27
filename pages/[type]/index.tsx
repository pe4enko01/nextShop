import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { Htag, Button, P, Tag, Rating } from '../components/indexs';
import { useEffect, useState } from 'react';
//import {  withLayout } from '../layout/layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interfaces';
import { stringify } from 'querystring';
import { GetStaticPaths, GetStaticProps } from 'next';
import { firstLevelMenu } from '../../helpers/helpers';
import { withLayout } from '../../layout/layout';

function Type(): JSX.Element {
 

  return (
    <>
     Search
    </>
  )
}

export default withLayout(Type);

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
export const getStaticPaths: GetStaticPaths = async ()=>{
    return {
        paths:firstLevelMenu.map(m=> '/' + m.route),
        fallback: true
    }
  }
