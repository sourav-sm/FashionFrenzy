import React, { useState } from "react";
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        id: "",
        name: "",
        image: "",
        category: "Women",
        old_prices: "", // Updated field name
        new_prices: "", // Updated field name
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);

        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        try {
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            responseData = await uploadResponse.json();

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);

                const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                const data = await addProductResponse.json();

                if (data.success) {
                    alert("Product Added");
                } else {
                    alert("Failed");
                }
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };
    

    // const Add_Product = async () => {
    //     console.log(productDetails);
        
    //     try {
    //         // Step 1: Upload the image
    //         let formData = new FormData();
    //         formData.append('product', image);
    
    //         const uploadResponse = await fetch('http://localhost:4000/upload', {
    //             method: 'POST',
    //             body: formData,
    //         });
    
    //         const uploadData = await uploadResponse.json();
    
    //         console.log('Upload Response:', uploadData);
    
    //         if (uploadData.success) {
    //             // Step 2: Update productDetails with the image URL
    //             const updatedProduct = { ...productDetails, image: uploadData.image_url };
    
    //             // Step 3: Add the product to the backend
    //             const addProductResponse = await fetch('http://localhost:4000/addproduct', {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(updatedProduct),
    //             });
    
    //             const addProductData = await addProductResponse.json();
    
    //             console.log('Add Product Response:', addProductData);
    
    //             if (addProductData.success) {
    //                 alert('Product Added');
    //             } else {
    //                 // Handle the case when the server responds with an error
    //                 alert('Failed to add product. Server response: ' + addProductData.error);
    //             }
    //         } else {
    //             // Handle the case when the image upload fails
    //             alert('Failed to upload image. Server response: ' + uploadData.error);
    //         }
    //     } catch (error) {
    //         // Handle any unexpected errors
    //         console.error('Error adding product:', error);
    //         alert('Error adding product. Please try again.');
    //     }
    // };
    
    
    

    return (
        <div className="add-product">
            <div className="addproduct-itemfiled">
              <p>Product Title</p>
              <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder="Type Here" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_prices} onChange={changeHandler} type="text" name="old_prices" placeholder="Type Here" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_prices} onChange={changeHandler} type="text" name="new_prices" placeholder="Type Here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumnail-img" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id="file-input" hidden/>
            </div>
            <button onClick={()=>(Add_Product())} className="addproduct-btn">ADD</button>
        </div>
    )
}
export default AddProduct;
