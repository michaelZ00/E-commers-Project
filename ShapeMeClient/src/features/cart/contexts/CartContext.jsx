import { createContext , useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";

export const CartContext = createContext();

function CartProvider({ children }){
    const notify = () => toast.success('Product was added to the cart', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    const [myInfo, setMyInfo] = useState(null)
    const [isInfo, setIsInfo] = useState(false)   
    const [cartItems,setCartItems] = useState([]);
    const [totalProducts,setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0)
    const [cartId, setCartId] = useState("")
    const updateCart = (product) => {
        const quantity = product.product_quantity
            const updatedQuantity = cartItems.map((item) => {
                if(product._id === item._id) return {...item,product_quantity: quantity, product_total: quantity * product.product_price };
                return item;
            });
            setCartItems(updatedQuantity)
    }

    const addToCart = (product) => {
        const quantity = product.product_quantity
        const existingItem = cartItems.find(item => item._id === product._id);
        
        if(existingItem){
            const updatedQuantity = cartItems.map((item) => {
                if(product._id === item._id) return {...item,product_quantity:item.product_quantity + quantity, product_total:product.product_price * (item.product_quantity + quantity)};
                return item;
            });
            setCartItems(updatedQuantity)
        
        }
        if(!existingItem) setCartItems([...cartItems,{...product, product_total: quantity* product.product_price}])
        notify()
    }

    const removeFromCart = (product) => {

        if(product.quantity === 1) return setCartItems((cart) => cart.filter((item) => item._id !== product._id))
        else {
            const updatedQuantity = cartItems.map((item) => {
                if(product._id === item._id) return {...item,quantity:item.quantity - 1};
                return item;
            });
            setCartItems(updatedQuantity)
        }
    }

    const deleteFromCart = (product) => {
        setCartItems((cart) => cart.filter((item) => item._id !== product._id))
    } 
    const totalCart = () => {
        const myTotal1 = cartItems.reduce((sum, itme2)=>{
            return sum + itme2.product_price * itme2.product_quantity
          }, 0)
          setTotalPrice(myTotal1)
    }
    const carProducts = () => {
        const myTotal2 = cartItems.reduce((sum, itme2)=>{
            return sum +  itme2.product_quantity
          }, 0)
          setTotalProducts(myTotal2)
    }

    const resetCart = () => setCartItems([]);

    
    useEffect(() => {
     const storedCartItems = localStorage.getItem("cartItems");
     if(storedCartItems) setCartItems(JSON.parse(storedCartItems))
    },[])


    useEffect(() => {
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
    },[cartItems])
    useEffect(()=>{
        totalCart()
        carProducts()
    },[resetCart, deleteFromCart, addToCart])
    const objectSchemaBuyer = Yup.object({
    
        name: Yup.string()
          .required("buyer first name is Required"),
        last: Yup.string()
          .required("buyer last name is Required"),
        city: Yup.string()
          .required("buyer city is Required"),
        address: Yup.string()
          .required("buyer address is Required"),
        phone: Yup.string()
          .required("buyer phone is Required"),
      });

    const value = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        resetCart,
        setTotalProducts,
        totalProducts,
        totalCart,
        totalPrice,
        updateCart,
        objectSchemaBuyer,
        myInfo,
        setMyInfo,
        setIsInfo,
        isInfo,
        cartId,
        setCartId
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}


export default CartProvider;