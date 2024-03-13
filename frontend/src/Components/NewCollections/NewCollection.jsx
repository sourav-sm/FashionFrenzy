// import React, { useEffect, useState } from "react";
// import './NewCollection.css'
// import Item from "../Item/Item";

// const NewCollections = () =>{

//   const [new_collection,setNew_collection]=useState([]);

//   useEffect(()=>{
//      //fetch('http://localhost:4000/newcollections')
//     fetch('/api/newcollections')
//     .then((response)=>response.json())
//     .then((data)=>setNew_collection(data));
//   },[])

//   return (
//     <div className="new-collections" id="latest-collection">
//         <h1>NEW COLLECTIONS</h1>
//         <hr />
//         <div className="collections">
//             {new_collection.map((item,i)=>{
//                  return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
//             })}
//         </div>
//     </div>
//   )
// }
// export default NewCollections;

import React, { useEffect, useState } from "react";
import './NewCollection.css'
import Item from "../Item/Item";

const NewCollections = () =>{

  const [new_collection,setNew_collection]=useState([]);

  useEffect(()=>{
     //fetch('http://localhost:4000/newcollections')
    fetch('https://fftrail.onrender.com/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));
  },[])

  return (
    <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item,i)=>{
                 return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
export default NewCollections;