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

import { SDK_VERSION } from "firebase/app";


export const Comments = (product) => {
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

/*   console.log(userLogged);
 */  const allCommentsByProduct = useSelector((state) => state.productComments);
      const userId = useSelector((state) => state.userId)
  
  const [comment, setComment] = useState("");
  const [ondelete, onsetDelete] = useState("");
  const [stars, setStars] = useState(0);

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


  const handleStars = (e) => {
   
    setStars(e.target.value);

  };
  
   
/*    useEffect((id) => {
    dispatch(getUserId(id));
  }, [dispatch]);  */
 
  //comments only show after second click


  return (
    <div id='comments'>
      {allCommentsByProduct &&
        allCommentsByProduct.map((e) => {
          dispatch(getUserId(e.UserId))
          console.log(userId);
          return (
            <div key={e.id} className='flex justify-around bg-tertiary rounded-2xl p-4 mx-60'>
              <div className="flex flex-col">
                <div className="flex">
                  <i className="material-icons">person_pin</i>
                  
                   <span>{userId.username && userId.username}</span> 
                   <img src={userId.img && userId.img} alt="userImg"  /> 
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

      {userLogged && (
        <div className="flex flex-col items-center gap-4 py-8 ">
          <h1>Post Your Comments</h1>
          


          <div onChange={(e) => handleStars(e)}>
            
      <fieldset class="rating">
        <input type="radio" id="star5" name="rating" value="5" />
        <label class="full" for="star5" title="Awesome - 5 stars"></label>
        <input type="radio" id="star4half" name="rating" value="4.5" />
        <label
          class="half"
          for="star4half"
          title="Pretty good - 4.5 stars"
        ></label>
        <input type="radio" id="star4" name="rating" value="4" />
        <label class="full" for="star4" title="Pretty good - 4 stars"></label>
        <input type="radio" id="star3half" name="rating" value="3.5" />
        <label class="half" for="star3half" title="Meh - 3.5 stars"></label>
        <input type="radio" id="star3" name="rating" value="3" />
        <label class="full" for="star3" title="Meh - 3 stars"></label>
        <input type="radio" id="star2half" name="rating" value="2.5" />
        <label
          class="half"
          for="star2half"
          title="Kinda bad - 2.5 stars"
        ></label>
        <input type="radio" id="star2" name="rating" value="2" />
        <label class="full" for="star2" title="Kinda bad - 2 stars"></label>
        <input type="radio" id="star1half" name="rating" value="1.5" />
        <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
        <input type="radio" id="star1" name="rating" value="1" />
        <label class="full" for="star1" title="Sucks big time - 1 star"></label>
        <input type="radio" id="starhalf" name="rating" value="0.5" />
        <label
          class="half"
          for="starhalf"
          title="Sucks big time - 0.5 stars"
        ></label>
      </fieldset>
    </div>



          
          <textarea onChange={handleOnChange} value={comment} className='w-3/4 rounded-xl focus:ring-secondary focus:border-secondary'/>
          <button onClick={handlePost} className='bg-secondary p-4 rounded-lg text-white'>Add your review!</button>
          <div id="commentSent" className="commentSent">
            <span>comment sent succesfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};
