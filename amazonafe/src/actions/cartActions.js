import axios from "axios"
import {ADD_TO_CART, CART_REMOVE_ITEM} from "../constants/cartConstants"
import Cookie from "js-cookie"


const addToCart = (productId, qty) => async(dispatch, getState) =>{
    try{
        const {data} = await axios.get("/api/products/" + productId);
        dispatch({
            type: ADD_TO_CART,
            payload:{
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                name: data.countInStock,
                qty
        }})

        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems))
    }catch(error){}
}

const removeFromCart = (productId) => (dispatch, getState) =>{
       dispatch({type: CART_REMOVE_ITEM, payload:productId })

       const {cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems))
}
export {addToCart, removeFromCart}