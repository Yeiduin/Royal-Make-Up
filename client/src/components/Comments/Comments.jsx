import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../pages/firebase/context";
import "./commentSent.css";
//El usuario puede dar rating. Ese rating afecta al promedio del producto.
//El usuario que compro el producto solo puede comentar.
// ver foto de perfil del usuario y nombre.

import {
  deleteComment,
  getProductComment,
  postComment,
} from "../../redux/actions";

export const Comments = (id) => {
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

  console.log(userLogged);
  const allCommentsByProduct = useSelector((state) => state.productComments);

  const [comment, setComment] = useState("");
  const [ondelete, onsetDelete] = useState("");

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  console.log('hola peluche', allCommentsByProduct)
  const handlePost = () => {
    dispatch(
      postComment({ userId: userLogged.id, productId: id.id, text: comment })
    ).then(() => {
      setComment("");
      dispatch(getProductComment(id.id))
        .then(() => {
          document.getElementById("commentSent").style.display = "block";
        })
        .then(() => {
          handleModal();
        });
    });
  };

  //console.log({ userId: userLogged.id, productId: id.id, text: comment });

  //not deleting
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteComment(id)).then(() => {
      dispatch(getProductComment(id.id))
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
      dispatch(getProductComment(id.id));
    }, 900);
  };

  //win
  const handleModal = () => {
    setTimeout(() => {
      document.getElementById("commentSent").style.display = "none";
      dispatch(getProductComment(id.id));
    }, 1000);
  };
  /* 
  useEffect(() => {
    dispatch(getProductComment(id.id));
  }, [dispatch]); */

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
                  <span>Pepito Perez</span>
                </div>
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="w-1/2">{e.text}</p>
              {/* apparently it crashes here after */}
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

      {userLogged && (
        <div className="flex flex-col items-center gap-4 py-8 ">
          <h1>Post Your Comments</h1>
          <textarea onChange={handleOnChange}  className='w-3/4 rounded-xl focus:ring-secondary focus:border-secondary'/>
          <button onClick={handlePost} className='bg-secondary p-4 rounded-lg text-white'>Add your review!</button>
          <div id="commentSent" className="commentSent">
            <div>
              <span>comment sent succesfully!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
