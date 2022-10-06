import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editProduct } from "../../redux/actions";


const EditCard = ({ name, image, price, id, stock, discount, product, disable }) => {
    const dispatch=useDispatch()
      
      

      function disableProduct(){ product.disable=!disable
      const data={id:id, newProduct:product}
      dispatch(editProduct(data))
        
      }
      console.log(disable)
useEffect(() => {
  console.log("listo")
  
}, [product]);
  return (
    <div className='container bg-gray500 p-6 mx-auto grid grid-cols-7 col-span-1 gap-7'>
      <div >
        <img src={image} alt="product" width={25} height={25}/>
      </div>
      <div>
        <h6>{name}</h6>
      </div>
      <div>
        <h6>{price+" $"}</h6>
      </div>
      <div>
        <h6>{discount}</h6>
      </div>
      <div>
        <h6>{stock}</h6>
      </div>
      <Link to={`/editproduct/${id}`}>
      <div><button id={id} className="bg bg-green-400" value="Edit"  >Edit</button></div>
      </Link>
      <div><button id={id} className="bg bg-green-400" value="Disable" onClick={disableProduct}>{!product.disable? <>Disable</>:<>Enable</>}</button></div>
    </div>
  );
};

export default EditCard;

