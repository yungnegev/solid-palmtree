import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'


const ProductDetails = ({ product, products }) => {
    /* props destructured */
    const { image, name, details, price } = product
    /* local state */
    const [indexM, setIndexM] = useState(0)
    /* global state (context) */
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()
    /* buy now */
    const handleBuyNow = () => {
        onAdd(product, qty)
        setShowCart(true)
    }


    let $carousel = image?.map((item, index) =>{
        return (
            <img src={urlFor(item)}
                 key={index}
                 className={index === indexM ? 'small-image selected-image' : 'small-image'}
                 onMouseEnter={() => setIndexM(index)}/>
        )
    }) 

    let $marquee = products.map((item) => {
        return <Product key={item._id} product={item}/>
    })

    return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[indexM])} alt="" className='product-detail-image'/>
                </div>
                <div className='small-images-container'>
                    { $carousel }
                </div>
            </div>

            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p> (19) </p>
                </div>
                
                <h4>Details: </h4>
                <p>{details}</p>
                <p className='price'>{`$${price}`}</p>
                
                <div className='quantity'>
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={ decQty }><AiOutlineMinus/></span>
                        <span className='num'>{ qty }</span>
                        <span className='plus' onClick={ incQty }><AiOutlinePlus/></span>
                    </p>
                </div>
                
                <div className='buttons'>
                    <button type='button' className='add-to-cart' onClick={ () => onAdd(product, qty) }>Add to Cart</button>
                    <button type='button' className='buy-now' onClick={ handleBuyNow }>Buy Now</button>
                </div>
            </div>
        </div>

        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    { $marquee }
                </div>
            </div>
        </div>
    </div>
  )
}


export const getStaticPaths = async () => {
    const querry = `*[_type == "product"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(querry)
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)
    console.log(product)
    return {
      props: { product, products }
    }
  }
  

export default ProductDetails