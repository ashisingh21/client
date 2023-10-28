import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    useEffect(() => {



        let cartInLocal = localStorage.getItem('cartInLocal');
        if (cartInLocal) {

            setCart(JSON.parse(cartInLocal))
        }



    }, [])


    return (<>
        <CartContext.Provider value={[cart, setCart]}>
            {children}

        </CartContext.Provider>
    </>)
}

const useCart = () => useContext(CartContext)

export { useCart, CartProvider }
