import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Banner from '../components/Banner'
import ProductFeed from '../components/ProductFeed'

const inter = Inter({ subsets: ['latin'] })

export default function Home({products}:any) {
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header/>
      <main className='mx-auto bg-gray-100'>
        {/* banner */}
        <Banner/>


        {/* productfeed */}
        <ProductFeed products = {products}/>
       
      </main>
      </div>
  )
}
export async function getServerSideProps(){
   const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
   )

   return {props:{
    products,
   },
  }
}
