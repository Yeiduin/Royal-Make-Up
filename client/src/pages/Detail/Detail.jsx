import React, { useEffect } from "react";
import { DetailCard } from "../../components/DetailCard/DetailCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductById,
  getProducts,
  resetDetail,
} from "../../redux/actions/index";
import { SwiperComponent } from "../../components/SwiperComponent/SwiperComponent";

export const Detail = () => {
  const { productDetail, productType } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getProducts());
    return () => dispatch(resetDetail());
  }, [dispatch, id]);

  
  return (
    <div>
      {productDetail && <DetailCard {... productDetail} />}
      {productType.length && 
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <h2 className="text-xl pb-6">You might also like...</h2>
        <SwiperComponent array={productType} />
      </div>
      }
    </div>
  );
};
