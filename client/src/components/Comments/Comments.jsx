import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../pages/firebase/context";
import "./commentSent.css";
import { getUserId } from "../../redux/actions";
//El usuario puede dar rating. Ese rating afecta al promedio del producto.
//El usuario que compro el producto solo puede comentar.
// ver foto de perfil del usuario y nombre.

import {
  deleteComment,
  getProductComment,
  postComment,
  getUserOrder
} from "../../redux/actions";


export const Comments = (product) => {
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

/*   console.log(userLogged);
 */  const allCommentsByProduct = useSelector((state) => state.productComments);
      const userId = useSelector((state) => state.userId)
       const userOrder = useSelector((state)=> state.userOrder)
        console.log(userOrder)

        const ProductOrdered = userOrder.map((e)=> e.cart[0].Products[0].id)
        console.log(ProductOrdered)
        const FoundOrder = ProductOrdered.indexOf(product.product.id)
        console.log(FoundOrder != -1)

  const [comment, setComment] = useState("");
  const [ondelete, onsetDelete] = useState("");

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };
  
  //console.log('hola Kevin, te estamos viendo, cual es el peluche?(SEND PICS)', allCommentsByProduct)
  const handlePost = () => {
    dispatch(
      postComment({ userId: userLogged.id, productId: product.product.id, text: comment, /*  rating: stars  */})
    ).then(() => {
      setComment("");
      dispatch(getProductComment(product.product.id))
        .then(() => {
          document.getElementById("commentSent").style.display = "block";
        })
        .then(() => {
          handleModal();
        });
    });
  };

  //console.log({ userId: userLogged.id, productId: id.id, text: comment });

  //deleting
  const handleDelete = (id) => {
 
    dispatch(deleteComment(id)).then(() => {
      dispatch(getProductComment(product.product.id))
        .then(() => {
          document.getElementById("commentDeleted").style.display = "block";
        })
        .then(() => {
          handleModalDeleted();
        });
    });
  };

  const handleModalDeleted = () => {
    setTimeout(() => {
      document.getElementById("commentDeleted").style.display = "none";
      dispatch(getProductComment(product.product.id));
    }, 1100);
  };

  //win
  const handleModal = () => {
    setTimeout(() => {
      document.getElementById("commentSent").style.display = "none";
      dispatch(getProductComment(product.product.id));
    }, 1100);
  };



   
    useEffect(() => {
    dispatch(getUserOrder(userLogged.id));
  }, [dispatch]); 
 
  //comments only show after second click


  return (
    <div id='comments'>
      {allCommentsByProduct &&
        allCommentsByProduct.map((e) => {
        
          return (
            <div key={e.id} className='flex justify-around bg-tertiary rounded-2xl p-4 mx-60'>
              <div className="flex flex-col">
                <div className="flex">
                  <i className="material-icons">person_pin</i>
                  
                   <span>{e.User.username}</span> 
                   <img src={e.User.img} alt="userImg"  /> 
                </div>     
               {/* <span>⭐⭐⭐⭐⭐</span> */}
              </div>
              <p className="w-1/2">{e.text}</p>
              {userLogged?.id === e.UserId && (
                <div>
                  <button onClick={() => handleDelete(e.id)}>X</button>
                  <div id="commentDeleted" className="commentSent">
                    <span>Comment Deleted Succesfully</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {userLogged && FoundOrder != -1 ? (
        <div className="flex flex-col items-center gap-4 py-8 ">
          <h1>Review your purchase</h1>
          


          
          <textarea onChange={handleOnChange} value={comment} className='w-3/4 rounded-xl focus:ring-secondary focus:border-secondary'/>
          <button onClick={handlePost} className='bg-secondary p-4 rounded-lg text-white'>Add your review!</button>
          <div id="commentSent" className="commentSent">
            <span>comment sent succesfully!</span>
          </div>
        </div>
      ):<div className="flex flex-col items-center gap-4 py-8 ">
      <h1>Post Your Comments</h1>
      


      
      <textarea onChange={handleOnChange} value={comment} className='w-3/4 rounded-xl focus:ring-secondary focus:border-secondary'/>
      <button disabled onClick={handlePost} className='bg-tertiary p-4 rounded-lg text-black'>Add your review!</button>
      <div id="commentSent" className="commentSent">
        <span>comment sent succesfully!</span>
      </div>
    </div>} 
    </div>
  );
};
