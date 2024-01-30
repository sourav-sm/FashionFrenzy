import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import './CSS/ShopCategory.css'

const ShopCategory=()=>{
    const {all_product} = useContext(ShopContext);
    return(
        <div className="shop-category">

        </div>
    )
}
export default ShopCategory;