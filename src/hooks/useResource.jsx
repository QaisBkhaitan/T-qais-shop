import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useResource(url) {
    const controller = new AbortController();
    const [products,setProducts] = useState([]);
    
    const getProducts = async ()=>{
        const {data} = await axios.get(url,{
            signal: controller.signal
        });
        setProducts(data.products);
    };    
    useEffect(()=>{
        getProducts();
        return ()=>{
            controller.abort();
        }
    },[])
  
    return {products}
}
