import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, getProducts, reset, setDefaultFilter, sortProducts } from "../../redux/actions";
import { Gallery } from "../../components/Gallery/Gallery";
import { Sorter } from "../../components/Sorter/Sorter";
import { Pagination } from "../../components/Pagination/Pagination";
import { Filters } from "../../components/Filters/Filters";


export const Catalogue = () => {
  const dispatch = useDispatch();

  /* Configuración de pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const pageLength = 16; // productos por página
  const indexOfLast = currentPage * pageLength;
  const indexOfFirst = indexOfLast - pageLength;
  const pagination = (pageNum) => setCurrentPage(pageNum);

  const { products, filteredProducts, defaultSort } = useSelector((state) => state);

  /* Seteo de productos que se muestran */
  let productsShown = [];
  const [showing, setShowing] = useState([]);
  showing && (productsShown = showing?.slice(indexOfFirst, indexOfLast));

  const totalProducts = filteredProducts[0] || showing?.length
    ? showing?.length
    : products?.length;

  useEffect(() => {
    dispatch(getProducts());
    return () => dispatch(reset())
  }, [dispatch]);

  useEffect(() => {
    if(defaultSort) return setShowing(defaultSort)
    setShowing(products);
  }, [products, defaultSort]);

  useEffect(() => {
    if (filteredProducts[0]) return setShowing(filteredProducts);
    if (filteredProducts !== products) return setShowing(products);    
  }, [filteredProducts]);

  return (
    <div>
      
      
      <div className="flex flex-row flex-wrap justify-center mt-14 mb-11">
      
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
