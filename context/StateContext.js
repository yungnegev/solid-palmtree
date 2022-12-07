import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)
    
    let foundProduct
    let foundIndex

    /* increase quantty */
    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    /* decrease quantty */
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1
            return prevQty -1
        })
    }
    /* adding to cart (depending whether or not the item already exists in the cart)*/
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQty) => prevTotalQty + quantity)
        
        if (checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct, 
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)
        }else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }

        toast.success(`${qty} ${product.name} added.`)
    }
    /* changing quantity from inside the cart */
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) =>item._id === id)
        foundIndex = cartItems.findIndex((product) => product._id === id)
        let filteredCartItems = cartItems.filter((item) => item._id !== id) 

        if(value === 'inc'){
            let newCartItems = [...filteredCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]
            setCartItems(newCartItems)
            setTotalPrice((prev) => prev + foundProduct.price)
            setTotalQuantities((prev) => prev + 1)
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                let newCartItems = [...filteredCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]
                setCartItems(newCartItems)
                setTotalPrice((prev) => prev - foundProduct.price)
                setTotalQuantities((prev) => prev - 1)
            }
        }
    }
    /* removing items from the basket */
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) =>item._id === product._id)
        let filteredCartItems = cartItems.filter((item) => item._id !== product._id)

        setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity)
        setTotalQuantities((prev) => prev - foundProduct.quantity)
        setCartItems(filteredCartItems)
    }

    return(
        <Context.Provider value={{
            showCart,
            setShowCart,
            setCartItems,
            cartItems,
            totalPrice,
            setTotalPrice,
            totalQuantities,
            setTotalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
        }}>
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)