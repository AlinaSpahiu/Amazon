import React, {useState, useEffect } from "react"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {listProducts} from "../actions/productActions"

function HomeScreen(props){
 
    const productList = useSelector(state => state.productList)
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    
    useEffect(() => {
          dispatch(listProducts())
            return () => { }
       }, [])

    
    return loading ? <div> Loading...</div> :
           error ? <div>{error}</div> :
       <ul className="products ">
         { products.map((product, _id) =>
           <li key={product._id}> 
               <div className="product">
               <Link to={'/products/' + product._id}> 
                <img className="product-image" src={product.image} alt={product.name} /></Link> 
                 <p className="product-name"><Link to={'/products/' + product._id}>{product.name} </Link> </p>
                <p className="product-brand"> {product.brand} </p>
                <p className ="product-price"> {product.price}$ </p>
                <p className="product-rating"> {product.rating} stars({product.numReviews}) </p>
            </div>
        </li>
       ) 
      }</ul>
}  
export default HomeScreen