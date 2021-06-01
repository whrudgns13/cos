import React, {useState,useEffect} from 'react';
import AxiosApiService from '../../AxiosApiService';
import {useLocation} from "react-router";
function ProductDetail(props) {
    const [product,setProduct] = useState({product:[]});

    useEffect(()=>{
        getProductDetail()
    },[])
   
    function getProductDetail(){
        AxiosApiService.getProductDetail(window.localStorage.getItem("product_seq"))
        .then( res => {
            setProduct({
                product : res.data
            })
        })
        .catch(err => {
            console.log('getProductDetail() Error!', err);
        })
    }
    /*  
    useEffect(()=>{
        getProductList()
    },[])
    
    function getProductDetail(){
        AxiosApiService.getProductList()
        .then( res => {
            setProducts({
                product : res.data
            })
        })
        .catch(err => {
            console.log('getProductList() Error!', err);
        })
        console.log(products);
    }
  */  
    return (
        <>
        <h1>{product.product.product_title}</h1>
            </>
    )
}

export default ProductDetail
