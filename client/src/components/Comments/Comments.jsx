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
import "./Rating.css";

const Rating = () => {
  const [stars, setStars] = useState(0);

  const handleStars = (e) => {
    setStars(e.target.value);
  };
  console.log(stars);

  return (
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
  );
};

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
    }, 1100);
  };

  //win
  const handleModal = () => {
    setTimeout(() => {
      document.getElementById("commentSent").style.display = "none";
      dispatch(getProductComment(id.id));
    }, 1100);
  };
  /* 
  useEffect(() => {
    dispatch(getProductComment(id.id));
  }, [dispatch]); */

  //comments only show after second click

  return (
    <div>
      {allCommentsByProduct &&
        allCommentsByProduct.map((e) => {
           console.log(e.userId)
          return (
            <div key={e.id}>
              <p>{e.text}</p>
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
        <div>
          <span>Post Your Comments</span>
          {Rating()}
          <textarea value={comment} onChange={handleOnChange} />
          <button onClick={handlePost}>add your review!</button>
          <div id="commentSent" className="commentSent">
            <span>comment sent succesfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};
