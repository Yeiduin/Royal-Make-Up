import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  reset,
  sortProducts,
} from "../../redux/actions";
import { Gallery } from "../../components/Gallery/Gallery";
import { Sorter } from "../../components/Sorter/Sorter";
import { Pagination } from "../../components/Pagination/Pagination";
import { Filters } from "../../components/Filters/Filters";
import { Loader } from "../../components/Loader/Loader";
import { ToastContainer } from 'react-toastify';

export const Catalogue = () => {
  const dispatch = useDispatch();

  /* Configuración de pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const pageLength = 16; // productos por página
  const indexOfLast = currentPage * pageLength;
  const indexOfFirst = indexOfLast - pageLength;
  const pagination = (pageNum) => setCurrentPage(pageNum);

  const { products, filteredProducts, sortSelect } = useSelector(
    (state) => state
  );

  /* Seteo de productos que se muestran */
  let productsShown = [];
  const [showing, setShowing] = useState([]);
  showing && (productsShown = showing?.slice(indexOfFirst, indexOfLast));

  const totalProducts = 
    filteredProducts[0] || showing?.length ? showing?.length : products?.length;

    
  useEffect(() => {
    if(!products.length) dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setShowing(products);
    if (sortSelect.length) {
      dispatch(sortProducts(sortSelect));
    } else{
      dispatch(sortProducts("popular"));
    }
    
  }, [products]);

  useEffect(() => {
    if (filteredProducts[0]) return setShowing(filteredProducts);
    if (filteredProducts !== products) return setShowing(products);
  }, [filteredProducts]);

  if (!productsShown?.length) {
    return (
      <div className="mx-auto max-w-2xl lg:max-w-screen-2xl">
        <div className="flex justify-between pt-40 pb-10">
          <Loader />
        </div>
      </div>
    );
  } else
    return (
      <div>
        <ToastContainer />
        <div className="flex flex-col items-center mt-10 lg:flex lg:flex-row lg:justify-center lg:items-end lg:space-x-8">
          <Sorter pagination={pagination} />
          <Filters pagination={pagination} />
        </div>
        <Gallery productsShown={productsShown} />
        <Pagination
          currentPage={currentPage}
          pageLength={pageLength}
          products={totalProducts}
          pagination={pagination}
        />
      </div>
    );
};
