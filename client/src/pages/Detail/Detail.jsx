import React, { useEffect } from "react";
import { DetailCard } from "../../components/DetailCard/DetailCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  getProducts,
  resetDetail,
  getProductComment
} from "../../redux/actions/index";
import { SwiperComponent } from "../../components/SwiperComponent/SwiperComponent";
import { Comments } from "../../components/Comments/Comments";
import { Loader } from "../../components/Loader/Loader";
import { Rating } from "../../components/Rating/Rating";
import { ToastContainer } from 'react-toastify';


export const Detail = () => {
  const navigate = useNavigate()
  const { productDetail, productType, listPopular } = useSelector(
    (state) => state
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getProducts());
    dispatch(getProductComment(id));
    return () => dispatch(resetDetail());
  }, [dispatch, id]);

  if(Array.isArray(productDetail)){
    console.log("producto no existe")
    navigate("/error")
  }
  if(productDetail.disable){
    console.log("producto disabled")
    navigate("/error")
  }
  if(!productDetail.name?.length){
    return(
      <div className="flex flex-row justify-center space-x-20 pt-40">
      <div className="mb-12">
      <Loader />
      </div>
      </div>
    )
  } else return (
    <div className="flex flex-col justify-center items-center">
      <ToastContainer/>
      {productDetail && <DetailCard {...productDetail} />}
      <Rating productId={id}/>
      <Comments product={productDetail}/>
      <div className="mx-auto mt-16 max-w-2xl lg:max-w-screen-2xl">
      <h2 className="text-xl pb-6">You might also like...</h2>
        {productType?.length ? (
          <SwiperComponent array={productType} />
        ) : (
          <SwiperComponent array={listPopular} />
        )}
      </div>
      
    </div>

  );
};
