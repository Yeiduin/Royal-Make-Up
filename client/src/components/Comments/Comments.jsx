import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../pages/firebase/context";
// Falta eliminar. Mostrar el comentario apenas se hace el post, hay que clickear dos veces.
//El usuario puede dar rating. Ese rating afecta al promedio del producto.
//El usuario que compro el producto solo puede comentar.
import {
  deleteComment,
  getProductComment,
  postComment,
} from "../../redux/actions";

export const Comments = (id) => {
  const dispatch = useDispatch();
  const { userLogged } = useAuth();
  console.log(userLogged);
  const allCommentsByProduct = useSelector((state) => state.productComments);

  const [comment, setComment] = useState("");

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  const handlePost = () => {
    dispatch(
      postComment({ userId: userLogged.id, productId: id.id, text: comment })
    ).then(() => {
      dispatch(getProductComment(id.id));
    });
    setComment("");
  };

  console.log({ userId: userLogged.id, productId: id.id, text: comment });

  //not deleting
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteComment(id));
  };

  useEffect(() => {
    dispatch(getProductComment(id.id));
  }, [dispatch /*  JSON.stringify(allCommentsByProduct)]) */]);

  //comments only show after second click

  return (
    <div>
      {allCommentsByProduct &&
        allCommentsByProduct.map((e) => {
          return (
            <div key={e.id}>
              <p>{e.text}</p>
              {userLogged.id === e.UserId && (
                <button onClick={() => handleDelete(e.id)}>X</button>
              )}
            </div>
          );
        })}

      {userLogged.id && (
        <div>
          {" "}
          <span>Post Your Comments</span>
          <textarea onChange={handleOnChange} />
          <button onClick={handlePost}>add your review!</button>{" "}
        </div>
      )}
    </div>
  );
};
