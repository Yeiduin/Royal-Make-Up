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
  getUserOrder,
} from "../../redux/actions";

export const Comments = (product) => {
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

  /*   console.log(userLogged);
   */ const allCommentsByProduct = useSelector(
    (state) => state.productComments
  );
  const userId = useSelector((state) => state.userId);
  const userOrder = useSelector((state) => state.userOrder);

  const getCarts = userOrder?.map((e) => e.cart[0].Products);
  const flattenArrays = getCarts?.flat()
  const getProdId = flattenArrays?.map(e => e.id)
  

  const FoundOrder = getProdId.indexOf(product.product.id);

  const [comment, setComment] = useState("");
  const [ondelete, onsetDelete] = useState("");

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  //console.log('hola Kevin, te estamos viendo, cual es el peluche?(SEND PICS)', allCommentsByProduct)
  const handlePost = () => {
    dispatch(
      postComment({
        userId: userLogged.id,
        productId: product.product.id,
        text: comment /*  rating: stars  */,
      })
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
    }, 1200);
  };

   
   
    useEffect(() => {
      if(userLogged){
    dispatch(getUserOrder(userLogged.id))
  };
    
  }, [dispatch]);  

  //comments only show after second click

  return (
    <div id='comments' className="p-5 lg:w-full flex flex-col gap-4">
      {allCommentsByProduct &&
        allCommentsByProduct.map((e) => {
          return (
            <div
              key={e.id}
              className="flex justify-start text-primary bg-tertiary rounded-2xl p-4 mx-60"
            >
              <div className="flex">
                <div className="flex flex-col">
                  <div className="flex w-36 gap-2">
                    <div className="w-10 h-10 rounded-full bg-white">
                      <img src={e.User.img} alt="userImg" className="w-full object-cover rounded-full"/>
                    </div>
                    <span className="font-bold">{e.User.username}</span>
                  </div>
                  {/* <span>⭐⭐⭐⭐⭐</span> */}
                </div>
                <div className="flex flex-col">
                  <p className="text-justify py-4">{e.text}</p>
                  {/* apparently it crashes here after */}
                  {userLogged?.id === e.UserId && (
                    <div className="flex self-end">
                      <button onClick={() => handleDelete(e.id)} className='bg-secondary rounded-lg w-12 h-12'>
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
              </div>
            </div>
          );
        })}

      {userLogged && FoundOrder != -1 &&  userLogged.type != "Banned" && userLogged.type != "Blocked" && (
        <div className="flex flex-col items-center gap-4 py-8 ">
          <h1>Review your purchase</h1>

          <textarea
            onChange={handleOnChange}
            value={comment}
            className="w-3/4 rounded-xl focus:ring-secondary focus:border-secondary"
          />
          <button
            onClick={handlePost}
            className="bg-secondary p-4 rounded-lg text-white"
          >
            Add your review!
          </button>
          <div id="commentSent" className="commentSent">
            <span>comment sent succesfully!</span>
          </div>
        </div>
      ) }
    </div>
  );
};
