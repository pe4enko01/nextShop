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

function Home({menu}:HomeProps): JSX.Element {
  const [counter, setCounter] = useState<number>(0);

  useEffect(()=>{
    console.log('counter ' + counter);
    return function cleanup(){
      console.log('Unmount')
    }
  });

  const [reting, setRaring] = useState<number>(4);

  return (
    <>
      <Button appearance="primary" arrow="right" onClick={() => setCounter(x => x + 1)}>Button</Button>
      <Button appearance="ghost" arrow="down">Button</Button>
      <P size='l'> Большой </P>
      <P size='m'> Средний </P>
      <P size='s'> Маленький </P>
      <Tag size="s" color="primary">НУ</Tag>
      <Tag size="m">ЛЯЛЯ</Tag>
      <Rating rating={reting} isEditable setRaring={setRaring}></Rating>
      <ul>
        {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
    </>
  )
}

export default withLayout(Home);

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