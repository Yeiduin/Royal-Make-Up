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
} from "../../redux/actions";


export const Comments = (product) => {
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

/*   console.log(userLogged);
 */  const allCommentsByProduct = useSelector((state) => state.productComments);
      const userId = useSelector((state) => state.userId)
  
  const [comment, setComment] = useState("");
  const [ondelete, onsetDelete] = useState("");

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };
  //console.log('hola Kevin, te estamos viendo, cual es el peluche?(SEND PICS)', allCommentsByProduct)
  const handlePost = () => {
    dispatch(
      postComment({ userId: userLogged.id, productId: product.product.id, text: comment,  rating: stars })
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



   
/*    useEffect((id) => {
    dispatch(getUserId(id));
  }, [dispatch]);  */
 
  //comments only show after second click


  return (
    <div id='comments' className="p-5">
      {allCommentsByProduct &&
        allCommentsByProduct.map((e) => {
        
          return (
            <div key={e.id} className='flex flex-col bg-tertiary rounded-2xl p-4 '>
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
                <div className="flex justify-end">
                  <button onClick={() => handleDelete(e.id)} className='bg-secondary px-4 py-2 rounded-lg'>
                  <i className="material-icons text-tertiary">delete</i>
                  </button>
                  <div id="commentDeleted" className="commentSent">
                    <div>
                      <span>Comment Deleted Succesfully</span>
                      <i className="text-secondary text-4xl material-icons">delete_forever</i>                      
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {userLogged && (
        <div className="flex flex-col gap-4 py-8 ">
          <h1 className="self-center">Post Your Comments</h1>
          <textarea onChange={handleOnChange}  className='w-4/5 h-28 rounded-xl self-center focus:ring-secondary focus:border-secondary '/>
          <button onClick={handlePost} className='bg-secondary p-4 rounded-lg text-white w-60 self-center'>Add your review!</button>
          <div id="commentSent" className="commentSent">
            <div>
              <span>comment sent succesfully!</span>
              <i className="text-4xl material-icons">check_box</i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
