import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { baseUrl } from '../../urls';

const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);

    const fetchinfo = async ()=>{
      await fetch(`${baseUrl}/allproducts`)
      .then((res)=>res.json())
      .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
      fetchinfo();
    },[])

    const remove_product = async (id)=>{
      await fetch(`${baseUrl}/removeproduct`,{
        method:'POST',
        headers:{
          Accept:'applpiocation/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({id:id})
      })
       await fetchinfo();
    }

  return (
    <div className='listproduct'>
      <h1>ALL PRODUCT LISTS</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => (
          <React.Fragment key={product.id}>
            <div className="listproduct-format-main listproduct-format">
             <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon}  alt="" />
            </div>
            <hr />
          </React.Fragment>
        ))}
        {/* {allproducts.map((product,index)=>{
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img  className='listproduct-remove-icon' src={cross_icon}  alt="" />
          </div>
          <hr />
          </>
        })} */}
      </div>
    </div>
  )
}

export default ListProduct
