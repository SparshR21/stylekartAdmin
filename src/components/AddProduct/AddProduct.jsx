import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { baseUrl } from '../../urls'

const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails,setproductDetails] = useState({
      name:"",
      image:"",
      category:"women",
      new_price:"",
      old_price:""
    })

    const [password, setPassword] = useState('');
    const [passwordCorrect, setPasswordCorrect] = useState(true);

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
      setproductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const validatePassword = () => {
      const correctPassword = "thisisadmin"; // Set your password here
      if (password === correctPassword) {
          setPasswordCorrect(true);
          return true;
      } else {
          setPasswordCorrect(false);
          alert("You are not the Admin.");
          return false;
      }
  };

    const add_product = async () => {
      console.log(productDetails);
      let responseData;
      let product = productDetails;
  
      let formData = new FormData();
      formData.append('product', image);
      formData.append('name', productDetails.name);
      formData.append('category', productDetails.category);
      formData.append('new_price', productDetails.new_price);
      formData.append('old_price', productDetails.old_price);
  
      await fetch(`${baseUrl}/upload`, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
          },
          body: formData,
      })
          .then((resp) => resp.json())
          .then((data) => {
              responseData = data;
              if (responseData.success) {
                  product.image = responseData.Image_url;
                  console.log(product);
                  fetch(`${baseUrl}/addproduct`, {
                      method: 'POST',
                      headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(product),
                  })
                      .then((resp) => resp.json())
                      .then((data) => {
                          data.success
                              ? alert('Product Added')
                              : alert('Failed');
                      });
              }
          });
  };
  

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
                <p>Password</p>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Enter password' 
                    autoComplete='off' 
                />
                {!passwordCorrect && <p className="error-message">Incorrect password</p>}
            </div>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' autoComplete='off' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here'/>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{add_product()}} className='addprocut-btn'>ADD PRODUCT</button>
    </div>
  )
}

export default AddProduct
