import React from 'react'

const Home = () => {
  
  let $productsWheel = ['Product 1', 'Product 2'].map((product) => {
    return product
  })
  
  return (
    <div>
      HeroBanner
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Take a look</p>
      </div>

      <div className='products-container'>
        { $productsWheel }
      </div>
       
       Footer
    </div>
  )
}

export default Home