import React from 'react'
import { FooterBanner, HeroBanner, Product } from '../components'
import { client } from '../lib/client'



const Home = ({ products, bannerResponse }) => {
  let $productsFeed = products?.map((product) => {
    return <Product key={product._id} product={product} /> 
  })
  
  return (
    <div>
      <HeroBanner bannerData={bannerResponse.length && bannerResponse[1]}/>

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Take a look</p>
      </div>

      <div className='products-container'>
        { $productsFeed }
      </div>
     
       <FooterBanner bannerData={bannerResponse[0]}/>
    </div>
  )
}

/* async call to a server side render */

export const getServerSideProps = async () => {
  const queryProd = '*[_type == "product"]'
  const products = await client.fetch(queryProd)
  const queryBanner = '*[_type == "banner"]'
  const bannerResponse = await client.fetch(queryBanner)
  const queryLogo = '*[_type == "logo"]'
  const logo = await client.fetch(queryLogo)

  return {
    props: { products, bannerResponse, logo }
  }
}


export default Home