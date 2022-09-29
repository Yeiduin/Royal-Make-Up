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
import { Loader } from "../../components/Loader/Loader";


export const Detail = () => {
  const { productDetail, productType, listPopular } = useSelector(
    (state) => state
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getProducts());
    return () => dispatch(resetDetail());
  }, [dispatch, id]);

  if(!productDetail.name?.length){
    return(
      <div className="flex flex-row justify-center space-x-20 pt-40">
      <div className="mb-12">
      <Loader />
      </div>
      </div>
    )
  } else return (
    <div>
      {productDetail && <DetailCard {...productDetail} />}
        <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
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
